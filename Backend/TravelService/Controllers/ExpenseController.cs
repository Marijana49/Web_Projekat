using Data.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;
using TravelService.Services.Service;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        private readonly IShareTokenValidator _shareTokenValidator;

        public ExpenseController(IExpenseService expenseService, IShareTokenValidator shareTokenValidator)
        {
            _expenseService = expenseService;
            _shareTokenValidator = shareTokenValidator;
        }

        [HttpPost("expenses")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> AddNewExpense(CreateExpenseDto expense)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _expenseService.AddExpenseAsync(expense);
            return Ok();
        }

        [HttpGet("expenses/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTravelPlansExpenses(int id, [FromHeader(Name = "X-Share-Token")] string? shareToken)
        {
            if (User.Identity?.IsAuthenticated == true && string.IsNullOrEmpty(shareToken))
            {
                var expenses = await _expenseService.GetAllExpensesByPlanIdAsync(id);
                return Ok(expenses);
            }

            if (!string.IsNullOrEmpty(shareToken))
            {
                var accessType = await _shareTokenValidator.ValidateAsync(shareToken, id);
                if (accessType == null) return Unauthorized();
                var expenses = await _expenseService.GetAllExpensesByPlanIdAsync(id);
                return Ok(expenses);
            }

            return Unauthorized();
        }
    }
}