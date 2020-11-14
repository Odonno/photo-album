using System;
using System.Collections.Generic;

namespace PhotoAlbumFunctions.Data
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}
