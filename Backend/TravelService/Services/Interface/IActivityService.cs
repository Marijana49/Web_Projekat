using Data.DTOs;

namespace TravelService.Services.Interface
{
    public interface IActivityService
    {
        Task CreateNewActivityAsync(int id, CreateActivityDto dto);
        Task<ICollection<ActivityDto>> GetActivitiesByDateAsync(int id, DateOnly date);
        Task DeleteActivityAsync(int id);
    }
}
