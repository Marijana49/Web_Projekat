using Data.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    [Authorize]
    public class DestinationController : ControllerBase
    {
        private readonly IDestinationService _destinationService;

        public DestinationController(IDestinationService destinationService)
        {
            _destinationService = destinationService;
        }

        [HttpPost("newDestination/{id}")]
        [Authorize(Roles = "USER")]
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
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("travel-plans/destinations/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> GetTravelPlanDestinations(int id)
        {
            var destinations = await _destinationService.GetTravelPlanDestinationsAsync(id);

            return Ok(destinations);
        }

        [HttpDelete("destinations/delete/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> DeleteDestination(int id)
        {
            await _destinationService.DeleteDestinationAsync(id);
            return NoContent();
        }

        [HttpGet("destinations/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> GetDestinationById(int id)
        {
            try
            {
                var destination = await _destinationService.GetDestinationAsync(id);
                return Ok(destination);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPatch("destinations/edit/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> EditDestination(int id, [FromBody] UpdateDestinationDto dto)
        {
            try
            {
                await _destinationService.UpdateDestinationAsync(id, dto);
                return Ok();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
