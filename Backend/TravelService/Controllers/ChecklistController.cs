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

        private async Task<IActionResult?> CheckOwnership(int planId)
        {
            var currentUserId = User.FindFirst("id")?.Value;
            var ownerId = await _checklistService.GetPlanOwnerIdAsync(planId);

            if (ownerId == null) return NotFound("Plan ne postoji!");

            bool isOwner = currentUserId == ownerId.ToString();
            bool isAdmin = User.FindFirst("role")?.Value == "ADMIN";

            if (!isOwner && !isAdmin) return Forbid();

            return null; 
        }

        [HttpGet("checklists/{id}")]
        public async Task<IActionResult> GetChecklistByPlanId(int id)
        {
            var check = await CheckOwnership(id);
            if (check != null) return check;

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
        public async Task<IActionResult> AddNewChecklistItem(int id,CreateChecklistItemDto createChecklistItemDto)
        {
            var check = await CheckOwnership(id);
            if (check != null) return check;

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
