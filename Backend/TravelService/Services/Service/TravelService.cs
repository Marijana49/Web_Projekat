using Data.DTOs;
using Data.Models;
using TravelService.Services.Interface;

namespace TravelService.Services.Service
{
    public class TravelService : ITravelService
    {
        public Task CreateTravelPlanAsync(CreateTravelPlan travelPlan)
        {
            throw new NotImplementedException();
        }

        public Task DeteletTravelPlanAsync(int planId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TravelPlan>> GetAllTravelPlansAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateTravelPlan(int planId, UpdateTravelPlanDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
