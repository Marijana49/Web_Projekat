using Data.DTOs;

namespace TravelService.Services.Interface
{
    public interface IBudgetService
    {
        public Task<BudgetDto> GetBudgetSummaryAsync(int planId);
    }
}
