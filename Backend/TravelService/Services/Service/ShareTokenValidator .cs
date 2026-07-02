using Data.DTOs;
using Data.Enums;
using TravelService.Services.Interface;
namespace TravelService.Services.Service
{
    public class ShareTokenValidator : IShareTokenValidator
    {
        private readonly HttpClient _httpClient;
        public ShareTokenValidator(HttpClient httpClient) => _httpClient = httpClient;
        public async Task<AccessType?> ValidateAsync(string token, int expectedPlanId)
        {
            var response = await _httpClient.GetAsync(
                $"api/sharing/{token}/validate?PartitionKind=Int64Range&PartitionKey=0");
            if (!response.IsSuccessStatusCode) return null;
            var result = await response.Content.ReadFromJsonAsync<ValidateTokenResponse>();
            if (result == null || !result.IsValid || result.PlanId != expectedPlanId)
                return null;
            return result.AccessType;
        }
    }
}