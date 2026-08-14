using System.Text.Json;
using TravelService.Services.Interface;

namespace TravelService.Services.Service
{
    public class NominatimGeocodingService : IGeocodingService
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;
        public NominatimGeocodingService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _baseUrl = configuration["Geocoding:NominatimBaseUrl"]
              ?? "https://nominatim.openstreetmap.org/search";

            var userAgent = configuration["Geocoding:UserAgent"] ?? "TravelPlannerApp/1.0";
            _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd(userAgent);
        }
        public async Task<(double? Latitude, double? Longitude)> GeocodeAsync(string address)
        {
            if (string.IsNullOrWhiteSpace(address))
                return (null, null);

            var url = $"{_baseUrl}?q={Uri.EscapeDataString(address)}&format=json&limit=1";

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
