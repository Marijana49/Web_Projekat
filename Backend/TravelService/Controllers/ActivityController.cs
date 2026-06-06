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
                await _activityService.CreateNewActivityAsync(id, dto);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("activities/{id}/{date}")]
        [Authorize(Roles = "USER")]
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
    }
}
