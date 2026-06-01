using Data.DTOs;

namespace TravelService.Services.Interface
{
    public interface IDestinationService
    {
        Task CreateDestinationAsync(int id, CreateDestinationDto createDestinationDto);
    }
}
