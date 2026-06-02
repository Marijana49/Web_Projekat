using Data.Data;
using Data.DTOs;
using Data.Models;
using Microsoft.EntityFrameworkCore;
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

        public async Task DeleteDestinationAsync(int id)
        {
            var destination = await _context.Destinations.FindAsync(id);

            if(destination == null)
            {
                throw new KeyNotFoundException("Destinacija ne postoji!");
            }

            _context.Destinations.Remove(destination);
            await _context.SaveChangesAsync();
        }

        public async Task<DestinationDto> GetDestinationAsync(int id)
        {
            var destination = await _context.Destinations.FindAsync(id);

            if(destination == null )
            {
                throw new KeyNotFoundException("Destinacija ne postoji!");
            }

            return new DestinationDto
            {
                Id = destination.Id,
                Name = destination.Name,
                Location = destination.Location,
                ArrivalDate = destination.ArrivalDate,
                DepartureDate = destination.DepartureDate,
                Description = destination.Description,
                TravelPlanId = destination.TravelPlanId
            };
        }

        public async Task<IEnumerable<DestinationDto>> GetTravelPlanDestinationsAsync(int id)
        {
            var plan = await _context.TravelPlans.FindAsync(id);

            if (plan == null)
            {
                throw new KeyNotFoundException("Plan nije pronađen!");
            }

            return await _context.Destinations.Where(d => d.TravelPlanId == id).Select(d => new DestinationDto
            {
                Id = d.Id,
                Name = d.Name,
                Location = d.Location,
                ArrivalDate = d.ArrivalDate,
                DepartureDate = d.DepartureDate,
                Description = d.Description,
                TravelPlanId = d.TravelPlanId
            }).ToListAsync();
        }

        public async Task UpdateDestinationAsync(int id, UpdateDestinationDto updateDestinationDto)
        {
            var destination = await _context.Destinations.FindAsync(id);

            if (destination == null)
            {
                throw new KeyNotFoundException("Plan nije pronađen!");
            }

            if (!string.IsNullOrEmpty(updateDestinationDto.Name)) destination.Name = updateDestinationDto.Name;
            if(!string.IsNullOrEmpty(updateDestinationDto.Location)) destination.Location = updateDestinationDto.Location;
            if(updateDestinationDto.ArrivalDate.HasValue) destination.ArrivalDate = updateDestinationDto.ArrivalDate.Value;
            if(updateDestinationDto.DepartureDate.HasValue) destination.DepartureDate = updateDestinationDto.DepartureDate.Value;
            if(!string.IsNullOrEmpty(updateDestinationDto.Description)) destination.Description = updateDestinationDto.Description;

            await _context.SaveChangesAsync();
        }
    }
}
