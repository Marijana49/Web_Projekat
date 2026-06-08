using Data.Enums;

namespace Data.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ExpenseCategory Category { get; set; }
        public double Amount { get; set; }
        public DateOnly Date { get; set; }
        public string Description { get; set; }
        public int TravelPlanId { get; set; }
        public TravelPlan TravelPlan { get; set; }
    }
}
