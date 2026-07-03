using Data.DTOs;
using Data.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;
namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    public class DestinationController : ControllerBase
    {
        private readonly IDestinationService _destinationService;
        private readonly IShareTokenValidator _shareTokenValidator;
        public DestinationController(IDestinationService destinationService, IShareTokenValidator shareTokenValidator)
        {
            _destinationService = destinationService;
            _shareTokenValidator = shareTokenValidator;
        }

        [HttpPost("newDestination/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> AddNewDestination(int id, [FromBody] CreateDestinationDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _destinationService.CreateDestinationAsync(id, dto);
            return Ok();
        }

        [HttpGet("travel-plans/destinations/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTravelPlanDestinations(int id, [FromHeader(Name = "X-Share-Token")] string? shareToken)
        {
            if (User.Identity?.IsAuthenticated == true && string.IsNullOrEmpty(shareToken))
            {
                var destinations = await _destinationService.GetTravelPlanDestinationsAsync(id);
                return Ok(destinations);
            }

            if (!string.IsNullOrEmpty(shareToken))
            {
                var accessType = await _shareTokenValidator.ValidateAsync(shareToken, id);
                if (accessType == null) return Unauthorized();
                var destinations = await _destinationService.GetTravelPlanDestinationsAsync(id);
                return Ok(destinations);
            }

            return Unauthorized();
        }

        [HttpDelete("destinations/delete/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteDestination(int id, [FromHeader(Name = "X-Share-Token")] string? shareToken)
        {
            bool isOwnerFlow = User.Identity?.IsAuthenticated == true && string.IsNullOrEmpty(shareToken);

            if (!isOwnerFlow)
            {
                if (User.Identity?.IsAuthenticated != true) return Unauthorized("Morate biti prijavljeni.");
                if (string.IsNullOrEmpty(shareToken)) return Forbid();

                var planId = await _destinationService.GetPlanIdForDestinationAsync(id);
                if (planId == null) return NotFound();

                var accessType = await _shareTokenValidator.ValidateAsync(shareToken, planId.Value);
                if (accessType != AccessType.Edit) return Forbid();
            }

            await _destinationService.DeleteDestinationAsync(id);
            return NoContent();
        }

        [HttpGet("destinations/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> GetDestinationById(int id)
        {
            var destination = await _destinationService.GetDestinationAsync(id);
            return Ok(destination);
        }

        [HttpPatch("destinations/edit/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> EditDestination(int id, [FromBody] UpdateDestinationDto dto, [FromHeader(Name = "X-Share-Token")] string? shareToken)
        {
            bool isOwnerFlow = User.Identity?.IsAuthenticated == true && string.IsNullOrEmpty(shareToken);

            if (!isOwnerFlow)
            {
                if (User.Identity?.IsAuthenticated != true) return Unauthorized("Morate biti prijavljeni.");
                if (string.IsNullOrEmpty(shareToken)) return Forbid();

                var planId = await _destinationService.GetPlanIdForDestinationAsync(id);
                if (planId == null) return NotFound();

                var accessType = await _shareTokenValidator.ValidateAsync(shareToken, planId.Value);
                if (accessType != AccessType.Edit) return Forbid();
            }

            await _destinationService.UpdateDestinationAsync(id, dto);
            return Ok();
        }
    }
}