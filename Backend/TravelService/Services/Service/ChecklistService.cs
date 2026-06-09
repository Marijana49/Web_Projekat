using Data.Data;
using Data.DTOs;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using TravelService.Services.Interface;

namespace TravelService.Services.Service
{
    public class ChecklistService : IChecklistService
    {
        private readonly TravelPlanDbContext _context;

        public ChecklistService(TravelPlanDbContext context)
        {
            _context = context;
        }

        public async Task AddNewChecklistItemAsync(CreateChecklistItemDto dto)
        {
            var newItem = new Checklist
            {
                Name = dto.Name,
                IsChecked = dto.IsChecked,
                TravelPlanId = dto.TravelPlanId,
            };

            _context.Checklists.Add(newItem);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteChecklistItemAsync(int id)
        {
            var checklist = await _context.Checklists.FindAsync(id);

            if (checklist == null)
            {
                return false;
            }

            _context.Checklists.Remove(checklist);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ChecklistDto>> GetChecklistByPlanIdAsync(int travelPlanId)
        {
            return await _context.Checklists
            .Where(c => c.TravelPlanId == travelPlanId)
            .Select(c => new ChecklistDto
            {
                Id = c.Id,
                Name = c.Name,
                IsChecked = c.IsChecked
            })
            .ToListAsync();
        }

        public async Task<bool> UpdateChecklistItemAsync(int id, UpdateChecklistDto dto)
        {
            var item = await _context.Checklists.FindAsync(id);
            if (item == null) return false;

            item.IsChecked = dto.IsChecked;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
