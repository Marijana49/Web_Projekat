using Data.DTOs;

namespace TravelService.Services.Interface
{
    public interface IChecklistService
    {
        Task AddNewChecklistItemAsync(CreateChecklistItemDto dto);
        Task<IEnumerable<ChecklistDto>> GetChecklistByPlanIdAsync(int travelPlanId);
        Task<bool> UpdateChecklistItemAsync(int id, UpdateChecklistDto dto);
        Task<bool> DeleteChecklistItemAsync(int id);
    }
}
