using Data.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityService _activityService;

        public ActivityController(IActivityService activityService)
        {
            _activityService = activityService;
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
        [Authorize(Roles = "USER, ADMIN")]
        public async Task<IActionResult> GetActivitiesByDate(int id, DateOnly date)
        {
            var res = await _activityService.GetActivitiesByDateAsync(id, date);

            return Ok(res);
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
