using Data.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;
using TravelService.Services.Service;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityService _activityService;
        private readonly IShareTokenValidator _shareTokenValidator;
        public ActivityController(IActivityService activityService, IShareTokenValidator shareTokenValidator)
        {
            _activityService = activityService;
            _shareTokenValidator = shareTokenValidator;
        }

        [HttpPost("activities/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> AddNewDestination(int id, [FromBody] CreateActivityDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _activityService.CreateNewActivityAsync(id, dto);
            return Ok();
        }

        [HttpGet("activities/{id}/{date}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetActivitiesByDate(int id, DateOnly date, [FromHeader(Name = "X-Share-Token")] string? shareToken)
        {
            if (User.Identity?.IsAuthenticated == true && string.IsNullOrEmpty(shareToken))
            {
                var res = await _activityService.GetActivitiesByDateAsync(id, date);
                return Ok(res);
            }

            if (!string.IsNullOrEmpty(shareToken))
            {
                var accessType = await _shareTokenValidator.ValidateAsync(shareToken, id);
                if (accessType == null) return Unauthorized();
                var res = await _activityService.GetActivitiesByDateAsync(id, date);
                return Ok(res);
            }

            return Unauthorized();
        }

        [HttpDelete("activities/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> DeteleActivity(int id)
        {
            await _activityService.DeleteActivityAsync(id);
            return NoContent();
        }

        [HttpGet("activities/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> GetActivityById(int id)
        {
            var activity = await _activityService.GetActivityByIdAsync(id);
            return Ok(activity);

        }

        [HttpPatch("activities/edit/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> EditActivity(int id, [FromBody] UpdateActivityDto dto)
        {
            await _activityService.UpdateActivityAsync(id, dto);
            return Ok();
        }
    }
}
