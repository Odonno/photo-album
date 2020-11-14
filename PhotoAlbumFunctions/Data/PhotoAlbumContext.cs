using Microsoft.EntityFrameworkCore;

namespace PhotoAlbumFunctions.Data
{
    public class PhotoAlbumContext : DbContext
    {
        public PhotoAlbumContext(DbContextOptions<PhotoAlbumContext> options) : base(options)
        {
        }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Photo>()
                .HasKey(p => p.Id);
            modelBuilder.Entity<Photo>()
                .Property(p => p.Url)
                .IsRequired();
            modelBuilder.Entity<Photo>()
                .Property(p => p.CreatedAt)
                .IsRequired();

            modelBuilder.Entity<Tag>()
                .HasKey(t => t.Id);
            modelBuilder.Entity<Tag>()
                .Property(t => t.Value)
                .IsRequired();
            modelBuilder.Entity<Tag>()
                .HasIndex(p => new { p.PhotoId, p.Value })
                .IsUnique();
        }
    }
}
