using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace PhotoAlbumFunctions.Helpers
{
    public static class BingHelper
    {
        private class BingImageResponse
        {
            public List<BingImageObjectResponse> Images { get; set; }
        }
        private class BingImageObjectResponse
        {
            public string Url { get; set; }
        }

        private static readonly HttpClient _httpClient = new HttpClient();

        public static async Task<string> GetImageOfTheDayUrl()
        {
            string strRegion = "en-US";
            string strBingImageURL = string.Format("http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n={0}&mkt={1}", 1, strRegion);

            var response = await _httpClient.GetAsync(new Uri(strBingImageURL));
            string jsonResponse = await response.Content.ReadAsStringAsync();

            var bingImageResponse = JsonConvert.DeserializeObject<BingImageResponse>(jsonResponse);
            return "https://www.bing.com" + bingImageResponse.Images[0].Url;
        }
    }
}
