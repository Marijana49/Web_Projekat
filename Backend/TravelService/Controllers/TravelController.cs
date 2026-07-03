using Data.DTOs;
using Data.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    //[Authorize]
    public class TravelController : ControllerBase
    {
        private readonly ITravelService _travelService;
        private readonly IShareTokenValidator _shareTokenValidator;
        public TravelController(ITravelService travelService, IShareTokenValidator shareTokenValidator)
        {
            _travelService = travelService;
            _shareTokenValidator = shareTokenValidator;
        }

        [HttpPost("newPlan")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> CreatePlan([FromBody] CreateTravelPlan dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            await _travelService.CreateTravelPlanAsync(dto);
            return Ok();
        }

        [HttpGet("plans")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAllTravelPlans()
        {
            var travelPlans = await _travelService.GetAllTravelPlansAsync();
            return Ok(travelPlans);
        }

        [HttpGet("{userId}/plans")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> GetUserTravelPlans(int userId)
        {
            var travelPlans = await _travelService.GetUserTravelPlansAsync(userId);

            if (travelPlans == null)
            {
                return NotFound("Planovi nisu pronađeni za ovog korisnika.");
            }

            return Ok(travelPlans);
        }

        [HttpDelete("deletePlan/{userId}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> DeleteTravelPlan(int userId)
        {
            await _travelService.DeteletTravelPlanAsync(userId);
            return NoContent();
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTravelPlan(int id, [FromHeader(Name = "X-Share-Token")] string? shareToken)
        {
            //throw new Exception($"STIGAO SAM! shareToken={shareToken}, isAuth={User.Identity?.IsAuthenticated}");
            if (User.Identity?.IsAuthenticated == true && string.IsNullOrEmpty(shareToken))
            {
                var plan = await _travelService.GetTravelPlanAsync(id);
                return Ok(plan);
            }

            if (!string.IsNullOrEmpty(shareToken))
            {
                var accessType = await _shareTokenValidator.ValidateAsync(shareToken, id);
                if (accessType == null) return Unauthorized();
                var plan = await _travelService.GetTravelPlanAsync(id);
                return Ok(plan);
            }

            return Unauthorized();
        }

        [HttpPatch("edit/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> EditTravelPlan(int id, [FromBody] UpdateTravelPlanDto dto, [FromHeader(Name = "X-Share-Token")] string? shareToken)
        {
            bool isOwnerFlow = User.Identity?.IsAuthenticated == true && string.IsNullOrEmpty(shareToken);

            if (!isOwnerFlow)
            {
                if (User.Identity?.IsAuthenticated != true) return Unauthorized("Morate biti prijavljeni.");
                if (string.IsNullOrEmpty(shareToken)) return Forbid();

                var accessType = await _shareTokenValidator.ValidateAsync(shareToken, id);
                if (accessType != AccessType.Edit) return Forbid();
            }

            await _travelService.UpdateTravelPlan(id, dto);
            return NoContent();
        }
    }
}
