using Data.Enums;

namespace TravelService.Services.Interface
{
    public interface IShareTokenValidator
    {
        Task<AccessType?> ValidateAsync(string token, int expectedPlanId);
    }
}
