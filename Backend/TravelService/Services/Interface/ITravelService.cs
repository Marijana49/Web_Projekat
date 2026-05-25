using TravelService.Models.DTOs;
using TravelService.Models.Entity;

namespace TravelService.Services.Interface
{
    public interface ITravelService
    {
        Task CreateTravelPlanAsync(CreateTravelPlan travelPlan);
        Task UpdateTravelPlan(int planId, UpdateTravelPlanDto dto);
        Task DeteletTravelPlanAsync(int planId);
        Task<IEnumerable<TravelPlan>> GetAllTravelPlansAsync();
    }
}
