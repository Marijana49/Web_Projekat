using Data.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    public class DestinationController : ControllerBase
    {
        private readonly IDestinationService _destinationService;

        public DestinationController(IDestinationService destinationService)
        {
            _destinationService = destinationService;
        }

        [HttpPost("newDestination/{id}")]
        public async Task<IActionResult> AddNewDestination(int id, [FromBody] CreateDestinationDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Prazni podaci");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _destinationService.CreateDestinationAsync(id, dto);
                return Ok();
            } catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("destinations/{id}")]
        public async Task<IActionResult> GetTravelPlanDestinations(int id)
        {
            var destinations = await _destinationService.GetTravelPlanDestinationsAsync(id);

            return Ok(destinations);
        }

        [HttpDelete("destination/{id}")]
        public async Task<IActionResult> DeleteDestination(int id)
        {
            await _destinationService.DeleteDestinationAsync(id);
            return NoContent();
        }
    }
}
