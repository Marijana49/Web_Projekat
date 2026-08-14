namespace TravelService.Services.Interface
{
    public interface IGeocodingService
    {
        Task<(double? Latitude, double? Longitude)> GeocodeAsync(string address);
    }
}
