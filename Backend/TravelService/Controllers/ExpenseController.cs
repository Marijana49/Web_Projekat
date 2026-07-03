using Data.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        private readonly IShareTokenValidator shareTokenValidator;

        public ExpenseController(IExpenseService expenseService, IShareTokenValidator shareTokenValidator)
        {
            _expenseService = expenseService;
            this.shareTokenValidator = shareTokenValidator;
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
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> GetTravelPlansExpenses(int id)
        {
            var expenses = await _expenseService.GetAllExpensesByPlanIdAsync(id);

            return Ok(expenses);
        }
    }
}
