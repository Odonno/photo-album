using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PhotoAlbumApi.Data;
using PhotoAlbumApi.Models;

namespace PhotoAlbumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly PhotoAlbumContext _context;
        private readonly string _blobStorageConnectionString;

        public PhotosController(PhotoAlbumContext context, IConfiguration configuration)
        {
            _context = context;
            _blobStorageConnectionString = configuration.GetConnectionString("BlobStorage");
        }

        private async Task<BlobContainerClient> GetPhotosBlobContainer()
        {
            // Create a BlobServiceClient object which will be used to create a container client
            var blobServiceClient = new BlobServiceClient(_blobStorageConnectionString);

            // Get or create a unique name for the container
            string containerName = "photos";

            try
            {
                var containerClient = await blobServiceClient.CreateBlobContainerAsync(containerName);
                await containerClient.Value.SetAccessPolicyAsync(PublicAccessType.Blob);

                return containerClient;
            }
            catch
            {
                return blobServiceClient.GetBlobContainerClient(containerName);
            }
        }

        [HttpGet]
        public Task<List<PhotoResult>> GetAll()
        {
            return _context.Photos
                .Include(p => p.Tags)
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => 
                    new PhotoResult
                    {
                        Id = p.Id,
                        Url = p.Url,
                        CreatedAt = p.CreatedAt,
                        Tags = p.Tags.Select(t => t.Value).ToList()
                    }
                )
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<PhotoResult> GetById(int id)
        {
            var photo = await _context.Photos
                   .Include(p => p.Tags)
                   .FirstOrDefaultAsync(p => p.Id == id);

            if (photo == null)
            {
                return null;
            }

            return new PhotoResult
            {
                Id = photo.Id,
                Url = photo.Url,
                CreatedAt = photo.CreatedAt,
                Tags = photo.Tags.Select(t => t.Value).ToList()
            };
        }

        [HttpPost]
        public async Task<PhotoResult> PostPhoto(IFormFile file)
        {
            // Create the container and return a container client object
            var containerClient = await GetPhotosBlobContainer();

            // Get a reference to a blob
            var blobClient = containerClient.GetBlobClient(file.FileName);

            // Open the file and upload its data            
            using var uploadFileStream = file.OpenReadStream();
            var blob = await blobClient.UploadAsync(uploadFileStream, true);
            uploadFileStream.Close();

            // Save photo in database
            var photo = new Photo
            {
                Url = blobClient.Uri.AbsoluteUri,
                CreatedAt = DateTime.Now,
                Tags = new List<Tag>()
            };

            _context.Photos.Add(photo);
            await _context.SaveChangesAsync();

            return new PhotoResult
            {
                Id = photo.Id,
                Url = photo.Url,
                CreatedAt = photo.CreatedAt,
                Tags = photo.Tags.Select(t => t.Value).ToList()
            };
        }

        [HttpPost("{photoId}/tag/{tag}")]
        public async Task<PhotoResult> AddPhotoTag(int photoId, string tag)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == photoId);

            if (photo == null)
            {
                return null;
            }

            photo.Tags.Add(new Tag { Value = tag });
            await _context.SaveChangesAsync();

            return new PhotoResult
            {
                Id = photo.Id,
                Url = photo.Url,
                CreatedAt = photo.CreatedAt,
                Tags = photo.Tags.Select(t => t.Value).ToList()
            };
        }

        [HttpDelete("{photoId}/tag/{tag}")]
        public async Task<PhotoResult> RemovePhotoTag(int photoId, string tag)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == photoId);

            if (photo == null)
            {
                return null;
            }

            var tagToRemove = await _context.Tags.FirstOrDefaultAsync(t => t.PhotoId == photoId && t.Value == tag);

            photo.Tags.Remove(tagToRemove);
            await _context.SaveChangesAsync();

            return new PhotoResult
            {
                Id = photo.Id,
                Url = photo.Url,
                CreatedAt = photo.CreatedAt,
                Tags = photo.Tags.Select(t => t.Value).ToList()
            };
        }
    }
}
