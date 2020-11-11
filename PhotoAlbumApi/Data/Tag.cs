namespace PhotoAlbumApi.Data
{
    public class Tag
    {
        public int Id { get; set; }
        public string Value { get; set; }

        public int PhotoId { get; set; }
    }
}
