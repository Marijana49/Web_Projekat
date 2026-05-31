using Data.Data;
using Data.DTOs;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using TravelService.Services.Interface;

namespace TravelService.Services.Service
{
    public class TravelPlanService : ITravelService
    {
        private readonly AppDbContext _context;

        public TravelPlanService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateTravelPlanAsync(CreateTravelPlan travelPlan)
        {
            var existingPlan = await _context.TravelPlans.AnyAsync(tp => tp.Name.ToLower() == travelPlan.Name.ToLower());

            if (existingPlan)
            {
                throw new InvalidOperationException("Plan sa ovim imenom postoji!");
            }

            var newPlan = new TravelPlan
            {
                Name = travelPlan.Name,
                Description = travelPlan.Description,
                StartDate = travelPlan.StartDate,
                EndDate = travelPlan.EndDate,
                Budget = travelPlan.Budget,
                Notes = travelPlan.Notes,
                UserId = travelPlan.UserId
            };

            _context.TravelPlans.Add(newPlan);
            await _context.SaveChangesAsync();
        }

        public Task DeteletTravelPlanAsync(int planId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TravelPlan>> GetAllTravelPlansAsync()
        {
            return await _context.TravelPlans.ToListAsync();
        }

        public async Task<IEnumerable<TravelPlan>> GetUserTravelPlansAsync(int id)
        {
            return await _context.TravelPlans.Where(tp => tp.UserId == id).ToListAsync();
        }

        public Task UpdateTravelPlan(int planId, UpdateTravelPlanDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
