using Data.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;
using TravelService.Services.Service;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    [Authorize]
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService budgetService;
        private readonly IShareTokenValidator _shareTokenValidator;

        public BudgetController(IBudgetService budgetService, IShareTokenValidator shareTokenValidator)
        {
            this.budgetService = budgetService;
            _shareTokenValidator = shareTokenValidator;
        }

        [HttpGet("summary/{planId}")]
        [AllowAnonymous]
        public async Task<ActionResult<BudgetDto>> GetSummary(int planId, [FromHeader(Name = "X-Share-Token")] string? shareToken)
        {
            if (User.Identity?.IsAuthenticated == true && string.IsNullOrEmpty(shareToken))
            {
                var summary = await budgetService.GetBudgetSummaryAsync(planId);
                return Ok(summary);
            }

            if (!string.IsNullOrEmpty(shareToken))
            {
                var accessType = await _shareTokenValidator.ValidateAsync(shareToken, planId);
                if (accessType == null) return Unauthorized();
                var summaryShared = await budgetService.GetBudgetSummaryAsync(planId);
                return Ok(summaryShared);
            }

            return Unauthorized();
        }
    }
}
