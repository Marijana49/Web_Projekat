using Data.DTOs;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    public class TravelController : ControllerBase
    {
        private readonly ITravelService _travelService;

        public TravelController(ITravelService travelService)
        {
            _travelService = travelService;
        }

        [HttpPost("newPlan")]
        public async Task<IActionResult> CreatePlan([FromBody] CreateTravelPlan dto)
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
                await _travelService.CreateTravelPlanAsync(dto);
                return Ok();
            }
            catch (Exception ex)
            {
                var inner = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest("GREŠKA JE: " + inner);
            }
        }

        [HttpGet("plans")]
        public async Task<IActionResult> GetAllTravelPlans()
        {
            var travelPlans = await _travelService.GetAllTravelPlansAsync();
            return Ok(travelPlans);
        }

        [HttpGet("{userId}/plans")]
        public async Task<IActionResult> GetUserTravelPlans(int userId)
        {
            if (userId == null)
            {
                return BadRequest("User ID je obavezan.");
            }

            try
            {
                var travelPlans = await _travelService.GetUserTravelPlansAsync(userId);

                if (travelPlans == null)
                {
                    return NotFound("Planovi nisu pronađeni za ovog korisnika.");
                }

                return Ok(travelPlans);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Došlo je do greške: {ex.Message}");
            }
        }

        [HttpDelete("deletePlan/{userId}")]
        public async Task<IActionResult> DeleteTravelPlan(int userId)
        {
            await _travelService.DeteletTravelPlanAsync(userId);
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTravelPlan(int id)
        {
            try
            {
                var plan = await _travelService.GetTravelPlanAsync(id);
                return Ok(plan);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpPatch("edit/{id}")]
        public async Task<IActionResult> EditTravelPlan(int id, [FromBody] UpdateTravelPlanDto dto)
        {
            try
            {
                 await _travelService.UpdateTravelPlan(id, dto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
