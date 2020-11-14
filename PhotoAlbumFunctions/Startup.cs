using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PhotoAlbumFunctions.Data;

[assembly: FunctionsStartup(typeof(PhotoAlbumFunctions.Startup))]
namespace PhotoAlbumFunctions
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var configuration = builder.GetContext().Configuration;

            builder.Services.AddDbContext<PhotoAlbumContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
            );
        }
    }
}
