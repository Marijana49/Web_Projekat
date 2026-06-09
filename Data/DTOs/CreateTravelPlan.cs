using System.ComponentModel.DataAnnotations;

namespace Data.DTOs
{
    public class CreateTravelPlan
    {
        [Required(ErrorMessage = "Unesite naziv plana putovanja!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Unesite opis plana!")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Početni datum je obavezan!")]
        public DateOnly StartDate { get; set; }

        [Required(ErrorMessage = "Krajnji datum je obavezan!")]
        public DateOnly EndDate { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Unesite validnu vrijednost!")]
        public double Budget { get; set; }

        [Required(ErrorMessage = "Unesite bilješke za plan!")]
        public string Notes { get; set; }
        public int UserId { get; set; }
    }
}
