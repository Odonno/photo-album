using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhotoAlbumApi.Models;

namespace PhotoAlbumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        [HttpGet("search/{search}")]
        public IEnumerable<string> Search(string search)
        {
            return new List<string>();
        }

        [HttpGet("{tag}/photos")]
        public IEnumerable<Photo> GetPhotosByTag()
        {
            return new List<Photo>();
        }
    }
}
