using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoAlbumApi.Models;

namespace PhotoAlbumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Photo> GetAll()
        {
            return new List<Photo>();
        }

        [HttpGet("{id}")]
        public Photo GetById()
        {
            return new Photo();
        }

        [HttpPost]
        public Photo PostPhoto(IFormFile file)
        {
            return new Photo();
        }

        [HttpPost("{photoId}/tag/{tag}")]
        public Photo AddPhotoTag(int photoId, string tag)
        {
            return new Photo();
        }

        [HttpDelete("{photoId}/tag/{tag}")]
        public Photo RemovePhotoTag(int photoId, string tag)
        {
            return new Photo();
        }
    }
}
