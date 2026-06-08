using Data.Enums;

namespace Data.DTOs
{
    public class BudgetCategoryDto
    {
        public ExpenseCategory Category { get; set; }
        public double TotalAmount { get; set; }
    }
}
