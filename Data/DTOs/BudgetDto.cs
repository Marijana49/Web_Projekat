namespace Data.DTOs
{
    public class BudgetDto
    {
        public int TravelPlanId { get; set; }
        public double Budget { get; set; }
        public double TotalExpenses { get; set; }
        public double RemainingBudget { get; set; }
        public List<BudgetCategoryDto> CategorySummaries { get; set; } = new();
    }
}
