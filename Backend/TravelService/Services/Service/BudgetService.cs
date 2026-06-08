using Data.Data;
using Data.DTOs;
using Microsoft.EntityFrameworkCore;
using TravelService.Services.Interface;

namespace TravelService.Services.Service
{
    public class BudgetService : IBudgetService
    {
        private readonly TravelPlanDbContext _context;

        public BudgetService(TravelPlanDbContext context)
        {
            _context = context;
        }

        public async Task<BudgetDto> GetBudgetSummaryAsync(int planId)
        {
            var plan = await _context.TravelPlans.FindAsync(planId);

            var expenses = await _context.Expenses
                .Where(e => e.TravelPlanId == planId)
                .ToListAsync();

            double totalExpenses = expenses.Sum(e => e.Amount);

            var categorySummaries = expenses
                .GroupBy(e => e.Category)
                .Select(g => new BudgetCategoryDto
                {
                    Category = g.Key,
                    TotalAmount = g.Sum(e => e.Amount)
                })
                .ToList();

            return new BudgetDto
            {
                TravelPlanId = planId,
                Budget = plan.Budget,
                TotalExpenses = totalExpenses,
                RemainingBudget = plan.Budget - totalExpenses,
                CategorySummaries = categorySummaries
            };
        }
    }
}
