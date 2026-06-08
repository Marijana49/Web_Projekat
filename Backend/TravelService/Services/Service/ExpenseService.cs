using Data.Data;
using Data.DTOs;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using TravelService.Services.Interface;

namespace TravelService.Services.Service
{
    public class ExpenseService : IExpenseService
    {
        private readonly TravelPlanDbContext _context;

        public ExpenseService(TravelPlanDbContext context)
        {
            _context = context;
        }

        public async Task AddExpenseAsync(CreateExpenseDto expense)
        {
            var existingExpense = await _context.Expenses.AnyAsync(tp => tp.Name.ToLower() == expense.Name.ToLower());

            if (existingExpense)
            {
                throw new InvalidOperationException("Trošak sa ovim imenom postoji!");
            }

            var newExpense = new Expense
            {
                Name = expense.Name,
                Amount = expense.Amount,
                Category = expense.Category,
                Date = expense.Date,
                Description = expense.Description,
                TravelPlanId = expense.TravelPlanId
            };

            _context.Expenses.Add(newExpense);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ExpenseDto>> GetAllExpensesByPlanIdAsync(int planId)
        {
            var planExpenses = await _context.Expenses.Where(e => e.TravelPlanId == planId).ToListAsync();

            return planExpenses.Select(e => new ExpenseDto
            {
                Id = e.Id,
                Name = e.Name,
                Amount = e.Amount,
                Category = e.Category,
                Date = e.Date,
                Description = e.Description,
                TravelPlanId = e.TravelPlanId
            });
        }
    }
}
