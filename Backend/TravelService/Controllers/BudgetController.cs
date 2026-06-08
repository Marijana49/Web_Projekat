using Data.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;
using TravelService.Services.Service;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService budgetService;

        public BudgetController(IBudgetService budgetService)
        {
            this.budgetService = budgetService;
        }

        [HttpGet("summary/{planId}")]
        public async Task<ActionResult<BudgetDto>> GetSummary(int planId)
        {
            var summary = await budgetService.GetBudgetSummaryAsync(planId);
            return Ok(summary);
        }
    }
}
