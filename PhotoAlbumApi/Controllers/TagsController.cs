using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoAlbumApi.Data;
using PhotoAlbumApi.Models;

namespace PhotoAlbumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly PhotoAlbumContext _context;

        public TagsController(PhotoAlbumContext context)
        {
            _context = context;
        }

        [HttpGet("search/{search}")]
        public IEnumerable<string> Search(string search)
        {
            string lowerSearch = search.ToLower();

            return _context.Tags
                .Select(t => t.Value)
                .Where(v => v.ToLower().StartsWith(lowerSearch))
                .Distinct()
                .Take(5);
        }

        [HttpGet("{tag}/photos")]
        public IEnumerable<PhotoResult> GetPhotosByTag(string tag)
        {
            string lowerTag = tag.ToLower();

            return _context.Photos
                .Include(p => p.Tags)
                .Where(p => p.Tags.Any(t => t.Value.ToLower() == lowerTag))
                .OrderByDescending(p => p.CreatedAt)
                .Select(p =>
                    new PhotoResult
                    {
                        Id = p.Id,
                        Url = p.Url,
                        CreatedAt = p.CreatedAt,
                        Tags = p.Tags.Select(t => t.Value).ToList()
                    }
                );
        }
    }
}
