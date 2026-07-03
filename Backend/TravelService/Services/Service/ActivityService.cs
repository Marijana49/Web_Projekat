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

            if (dto.Date < plan.StartDate || dto.Date > plan.EndDate)
            {
                throw new ArgumentException($"Aktivnost mora biti unutar okvira plana: od {plan.StartDate} do {plan.EndDate}");
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

            if (act == null)
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

        public async Task<ActivityDto> GetActivityByIdAsync(int id)
        {
            var activity = await _context.Activitys.FindAsync(id);

            if (activity == null)
            {
                throw new KeyNotFoundException("Aktivnost ne postoji!");
            }

            return new ActivityDto
            {
                Id = activity.Id,
                Name = activity.Name,
                Date = activity.Date,
                Time = activity.Time,
                Location = activity.Location,
                Description = activity.Description,
                Budget = activity.Budget,
                Status = activity.Status,
                TravelPlanId = activity.TravelPlanId,
                DestinationId = activity.DestinationId,
            };
        }

        public async Task<int?> GetPlanIdForActivityAsync(int activityId)
        {
            var activity = await _context.Activitys.FindAsync(activityId);
            return activity?.TravelPlanId;
        }

        public async Task UpdateActivityAsync(int id, UpdateActivityDto updateActivityDto)
        {
            var activity = await _context.Activitys.FindAsync(id);

            if (activity == null)
            {
                throw new KeyNotFoundException("Aktivnost nije pronađena!");
            }

            if (updateActivityDto.Date.HasValue)
            {
                var newDate = updateActivityDto.Date.Value;
                var plan = activity.TravelPlan;

                if (newDate < plan.StartDate || newDate > plan.EndDate)
                {
                    throw new ArgumentException($"Aktivnost mora biti unutar okvira plana: od {plan.StartDate} do {plan.EndDate}");
                }

                activity.Date = newDate;
            }

            if (!string.IsNullOrEmpty(updateActivityDto.Name)) activity.Name = updateActivityDto.Name;
            if (updateActivityDto.Date.HasValue) activity.Date = updateActivityDto.Date.Value;
            if (updateActivityDto.Time.HasValue) activity.Time = updateActivityDto.Time.Value;
            if (!string.IsNullOrEmpty(updateActivityDto.Location)) activity.Location = updateActivityDto.Location;
            if (!string.IsNullOrEmpty(updateActivityDto.Description)) activity.Description = updateActivityDto.Description;
            if (updateActivityDto.Budget.HasValue) activity.Budget = updateActivityDto.Budget.Value;
            if (updateActivityDto.Status.HasValue) activity.Status = updateActivityDto.Status.Value;

            await _context.SaveChangesAsync();
        }
    }
}
