using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using PhotoAlbumFunctions.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using PhotoAlbumFunctions.Models;
using System.Collections.Generic;

namespace PhotoAlbumFunctions
{
    public class GetPhotosFunction
    {
        private readonly PhotoAlbumContext _context;

        public GetPhotosFunction(PhotoAlbumContext context)
        {
            _context = context;
        }

        [FunctionName(nameof(GetPhotosFunction))]
        public Task<List<PhotoResult>> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "photos")] HttpRequest req,
            ILogger log
        )
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
    }
}
