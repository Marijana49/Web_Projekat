using Data.Data;
using Data.DTOs;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using TravelService.Services.Interface;

namespace TravelService.Services.Service
{
    public class ActivityService : IActivityService
    {
        private readonly TravelPlanDbContext _context;

        public ActivityService(TravelPlanDbContext context)
        {
            _context = context;
        }
        public async Task CreateNewActivityAsync(int id, CreateActivityDto dto)
        {
            var plan = await _context.TravelPlans.FindAsync(id);

            if (plan == null)
            {
                throw new KeyNotFoundException("Plan nije pronađen!");
            }

            var activity = new Activity
            {
                Name = dto.Name,
                Date = dto.Date,
                Time = dto.Time,
                Location = dto.Location,
                Description = dto.Description,
                Budget = dto.Budget,
                Status = dto.Status,
                TravelPlanId = dto.TravelPlanId,
                DestinationId = dto.DestinationId,
            };

            _context.Activitys.Add(activity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteActivityAsync(int id)
        {
            var act = await _context.Activitys.FindAsync(id);

            if(act == null)
            {
                throw new KeyNotFoundException("Aktivnost ne postoji!");
            }

            _context.Activitys.Remove(act);
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<ActivityDto>> GetActivitiesByDateAsync(int id, DateOnly date)
        {
            var activities = await _context.Activitys.Where(a => a.TravelPlanId == id && a.Date.Year == date.Year && a.Date.Month == date.Month && a.Date.Day == date.Day).ToListAsync();

            var actvityList = activities.Select(a => new ActivityDto
            {
                Id = a.Id,
                Name = a.Name,
                Date = a.Date,
                Time = a.Time,
                Location = a.Location,
                Description = a.Description,
                Budget = a.Budget,
                Status = a.Status,
                TravelPlanId = a.TravelPlanId,
                DestinationId = a.DestinationId,
            }).ToList();

            return actvityList;
        }
    }
}
