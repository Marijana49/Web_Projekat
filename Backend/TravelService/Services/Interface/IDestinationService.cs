using Data.DTOs;

namespace TravelService.Services.Interface
{
    public interface IDestinationService
    {
        Task CreateDestinationAsync(int id, CreateDestinationDto createDestinationDto);
        Task<IEnumerable<DestinationDto>> GetTravelPlanDestinationsAsync(int id);
        Task DeleteDestinationAsync(int id);
        Task<DestinationDto> GetDestinationAsync(int id);
        Task UpdateDestinationAsync(int id, UpdateDestinationDto updateDestinationDto);
    }
}
