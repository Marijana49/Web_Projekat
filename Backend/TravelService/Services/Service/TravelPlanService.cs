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

        public async Task DeteletTravelPlanAsync(int planId)
        {
            var plan = await _context.TravelPlans.FindAsync(planId);

            if (plan == null)
            {
                throw new KeyNotFoundException("Plan za brisanje ne postoji!");
            }

            _context.TravelPlans.Remove(plan);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TravelPlan>> GetAllTravelPlansAsync()
        {
            return await _context.TravelPlans.ToListAsync();
        }

        public async Task<TravelPlanDto> GetTravelPlanAsync(int id)
        {
            var plan = await _context.TravelPlans.FindAsync(id);

            if (plan == null)
            {
                throw new KeyNotFoundException("Plan ne postoji!");
            }

            return new TravelPlanDto
            {
                Id = plan.Id,
                Name = plan.Name,
                Description = plan.Description,
                StartDate = plan.StartDate,
                EndDate = plan.EndDate,
                Budget = plan.Budget,
                Notes = plan.Notes
            };
        }

        public async Task<IEnumerable<TravelPlan>> GetUserTravelPlansAsync(int id)
        {
            return await _context.TravelPlans.Where(tp => tp.UserId == id).ToListAsync();
        }

        public async Task UpdateTravelPlan(int planId, UpdateTravelPlanDto dto)
        {
            var plan = await _context.TravelPlans.FindAsync(planId);

            if (plan == null)
            {
                throw new KeyNotFoundException("Plan nije pronađen!");
            }

            if (!string.IsNullOrEmpty(dto.Name)) plan.Name = dto.Name;
            if (!string.IsNullOrEmpty(dto.Description)) plan.Description = dto.Description;
            if (dto.StartDate.HasValue) plan.StartDate = dto.StartDate.Value;
            if (dto.EndDate.HasValue) plan.EndDate = dto.EndDate.Value;
            if (dto.Budget.HasValue) plan.Budget = dto.Budget.Value;
            if (!string.IsNullOrEmpty(dto.Notes)) plan.Notes = dto.Notes;

            await _context.SaveChangesAsync();
        }
    }
}
