using System.ComponentModel.DataAnnotations;

namespace Data.DTOs
{
    public class UpdateTravelPlanDto
    {
        [Required(ErrorMessage = "Unesite naziv!")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Unesite opis plana!")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Unesite datum polaska!")]
        public DateOnly? StartDate { get; set; }

        [Required(ErrorMessage = "Unesite datum odlaska!")]
        public DateOnly? EndDate { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Unesite validnu vrijednost!")]
        public double? Budget { get; set; }

        [Required(ErrorMessage = "Unesite bilješk za plan!")]
        public string? Notes { get; set; }
        public int UserId { get; set; }
    }
}
