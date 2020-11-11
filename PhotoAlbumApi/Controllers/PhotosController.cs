using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoAlbumApi.Data;
using PhotoAlbumApi.Models;

namespace PhotoAlbumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly PhotoAlbumContext _context;

        public PhotosController(PhotoAlbumContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<PhotoResult> GetAll()
        {
            return _context.Photos
                .Include(p => p.Tags)
                .OrderByDescending(p => p.CreatedAt)
                .ToList()
                .Select(p =>
                {
                    return new PhotoResult
                    {
                        Id = p.Id,
                        Url = p.Url,
                        CreatedAt = p.CreatedAt,
                        Tags = p.Tags.Select(t => t.Value).ToList()
                    };
                });
        }

        [HttpGet("{id}")]
        public PhotoResult GetById(int id)
        {
            var photo = _context.Photos
                   .Include(p => p.Tags)
                   .FirstOrDefault(p => p.Id == id);

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
        public PhotoResult PostPhoto(IFormFile file)
        {
            // TODO : Upload file to Azure Blob Storage
            var photo = new Photo
            {
                Url = "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60",
                CreatedAt = DateTime.Now,
                Tags = new List<Tag>()
            };

            _context.Photos.Add(photo);
            _context.SaveChanges();

            return new PhotoResult
            {
                Id = photo.Id,
                Url = photo.Url,
                CreatedAt = photo.CreatedAt,
                Tags = photo.Tags.Select(t => t.Value).ToList()
            };
        }

        [HttpPost("{photoId}/tag/{tag}")]
        public PhotoResult AddPhotoTag(int photoId, string tag)
        {
            var photo = _context.Photos.FirstOrDefault(p => p.Id == photoId);

            if (photo == null)
            {
                return null;
            }

            photo.Tags.Add(new Tag { Value = tag });
            _context.SaveChanges();

            return new PhotoResult
            {
                Id = photo.Id,
                Url = photo.Url,
                CreatedAt = photo.CreatedAt,
                Tags = photo.Tags.Select(t => t.Value).ToList()
            };
        }

        [HttpDelete("{photoId}/tag/{tag}")]
        public PhotoResult RemovePhotoTag(int photoId, string tag)
        {
            var photo = _context.Photos.FirstOrDefault(p => p.Id == photoId);

            if (photo == null)
            {
                return null;
            }

            var tagToRemove = _context.Tags.FirstOrDefault(t => t.PhotoId == photoId && t.Value == tag);

            photo.Tags.Remove(tagToRemove);
            _context.SaveChanges();

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
