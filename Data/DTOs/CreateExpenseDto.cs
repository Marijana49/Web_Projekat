using Data.Enums;
using System.ComponentModel.DataAnnotations;

namespace Data.DTOs
{
    public class CreateExpenseDto
    {
        [Required(ErrorMessage = "Unesite naziv plana putovanja!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Kategorija je obavezna!")]
        [EnumDataType(typeof(ExpenseCategory), ErrorMessage = "Odabrana kategorija nije validna!")]
        public ExpenseCategory Category { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Unesite validnu vrijednost!")]
        public double Amount { get; set; }

        [Required(ErrorMessage = "Datum je obavezan!")]
        public DateOnly Date { get; set; }

        [Required(ErrorMessage = "Unesite opis troška!")]
        public string? Description { get; set; }
        public int TravelPlanId { get; set; }
    }
}
