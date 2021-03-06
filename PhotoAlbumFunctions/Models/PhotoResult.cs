﻿using System;
using System.Collections.Generic;

namespace PhotoAlbumFunctions.Models
{
    public class PhotoResult
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<string> Tags { get; set; }
    }
}
