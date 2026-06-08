using Data.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    [Authorize]
    public class ChecklistController : ControllerBase
    {
        private readonly IChecklistService _checklistService;

        public ChecklistController(IChecklistService checklistService)
        {
            _checklistService = checklistService;
        }

        [HttpGet("checklists/{id}")]
        public async Task<IActionResult> GetChecklistByPlanId(int id)
        {
            var items = await _checklistService.GetChecklistByPlanIdAsync(id);
            return Ok(items);
        }

        [HttpDelete("checklists/{id}")]
        public async Task<IActionResult> DeteleCheckListItem(int id)
        {
            await _checklistService.DeleteChecklistItemAsync(id);
            return NoContent();
        }

        [HttpPost("checklists/{id}")]
        public async Task<IActionResult> AddNewChecklistItem(CreateChecklistItemDto createChecklistItemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _checklistService.AddNewChecklistItemAsync(createChecklistItemDto);
            return Ok();
        }

        [HttpPatch("checklists/{id}")]
        public async Task<IActionResult> EditCheckListItem(int id, UpdateChecklistDto updateChecklistDto)
        {
            await _checklistService.UpdateChecklistItemAsync(id, updateChecklistDto);
            return Ok();
        }
    }
}
