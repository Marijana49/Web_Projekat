using Data.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    [Authorize]
    public class TravelController : ControllerBase
    {
        private readonly ITravelService _travelService;

        public TravelController(ITravelService travelService)
        {
            _travelService = travelService;
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
        [Authorize(Roles = "USER, ADMIN")]
        public async Task<IActionResult> GetTravelPlan(int id)
        {
            var plan = await _travelService.GetTravelPlanAsync(id);
            return Ok(plan);
        }

        [HttpPatch("edit/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> EditTravelPlan(int id, [FromBody] UpdateTravelPlanDto dto)
        {
            await _travelService.UpdateTravelPlan(id, dto);
            return NoContent();
        }

        [HttpDelete("user-plans/{id}")]
        [Authorize(Roles = "ADMIN")] 
        public async Task<IActionResult> DeleteAllPlansForUser(int id)
        {
            await _travelService.DeleteAllUserPlansAsync(id);
            return NoContent();
        }
    }
}
