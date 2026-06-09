using Data.Enums;
using System.ComponentModel.DataAnnotations;

namespace Data.DTOs
{
    public class CreateActivityDto
    {
        [Required(ErrorMessage = "Unesite naziv aktivnost!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Unesite datum!")]
        public DateOnly Date { get; set; }

        [Required(ErrorMessage = "Unesite vrijeme!")]
        public TimeOnly Time { get; set; }

        [Required(ErrorMessage = "Unesite lokaciju!")]
        public string Location { get; set; }

        [Required(ErrorMessage = "Unesite opis!")]
        public string Description { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Unesite validnu vrijednost!")]
        public double Budget { get; set; }
        public ActivityStatus Status { get; set; }
        public int TravelPlanId { get; set; }
        public int? DestinationId { get; set; }
    }
}
