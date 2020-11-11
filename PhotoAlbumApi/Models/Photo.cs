using System;
using System.Collections.Generic;

namespace PhotoAlbumApi.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<string> Tags { get; set; }
    }
}
