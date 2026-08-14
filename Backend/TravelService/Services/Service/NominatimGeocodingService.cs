using System.Text.Json;
using TravelService.Services.Interface;

namespace TravelService.Services.Service
{
    public class NominatimGeocodingService : IGeocodingService
    {
        private readonly HttpClient _httpClient;

        public NominatimGeocodingService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("TravelPlannerApp/1.0");
        }
        public async Task<(double? Latitude, double? Longitude)> GeocodeAsync(string address)
        {
            if (string.IsNullOrWhiteSpace(address))
                return (null, null);

            var url = $"https://nominatim.openstreetmap.org/search?q={Uri.EscapeDataString(address)}&format=json&limit=1";

            try
            {
                var response = await _httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode)
                    return (null, null);

                var json = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);

                if (doc.RootElement.GetArrayLength() == 0)
                    return (null, null);

                var first = doc.RootElement[0];
                var lat = double.Parse(first.GetProperty("lat").GetString()!, System.Globalization.CultureInfo.InvariantCulture);
                var lon = double.Parse(first.GetProperty("lon").GetString()!, System.Globalization.CultureInfo.InvariantCulture);

                return (lat, lon);
            }
            catch
            {
                return (null, null);
            }
        }
    }
}
