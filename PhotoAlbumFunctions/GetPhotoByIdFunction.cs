using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using PhotoAlbumFunctions.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using PhotoAlbumFunctions.Models;

namespace PhotoAlbumFunctions
{
    public class GetPhotoByIdFunction
    {
        private readonly PhotoAlbumContext _context;

        public GetPhotoByIdFunction(PhotoAlbumContext context)
        {
            _context = context;
        }

        [FunctionName(nameof(GetPhotoByIdFunction))]
        public async Task<PhotoResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "photos/{id}")] HttpRequest req,
            int id,
            ILogger log
        )
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
    }
}
