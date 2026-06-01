using Data.Data;
using Data.DTOs;
using Data.Models;
using TravelService.Services.Interface;

namespace TravelService.Services.Service
{
    public class DestinationService : IDestinationService
    {
        private readonly AppDbContext _context;

        public DestinationService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateDestinationAsync(int id, CreateDestinationDto createDestinationDto)
        {
            var plan = await _context.TravelPlans.FindAsync(id);

            if(plan == null)
            {
                throw new KeyNotFoundException("Plan nije pronađen!");
            }

            var destination = new Destination
            {
                Name = createDestinationDto.Name,
                Location = createDestinationDto.Location,
                ArrivalDate = createDestinationDto.ArrivalDate,
                DepartureDate = createDestinationDto.DepartureDate,
                Description = createDestinationDto.Description,
                TravelPlanId = id,
            };

             _context.Destinations.Add(destination);
            await _context.SaveChangesAsync();
        }
    }
}
