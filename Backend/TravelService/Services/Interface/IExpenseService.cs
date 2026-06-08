using Data.DTOs;

namespace TravelService.Services.Interface
{
    public interface IExpenseService
    {
        Task AddExpenseAsync(CreateExpenseDto expense);
        Task<IEnumerable<ExpenseDto>> GetAllExpensesByPlanIdAsync(int planId);
    }
}
