using System.ComponentModel.DataAnnotations;

namespace Data.DTOs
{
    public class UpdateDestinationDto
    {
        [Required(ErrorMessage = "Unesite naziv!")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Unesite lokaciju!")]
        public string? Location { get; set; }

        [Required(ErrorMessage = "Unesite datum dolaska!")]
        public DateOnly? ArrivalDate { get; set; }

        [Required(ErrorMessage = "Unesite datum odlaska!")]
        public DateOnly? DepartureDate { get; set; }

        [Required(ErrorMessage = "Unesite opis destinacije!")]
        public string? Description { get; set; }

        public int TravelPlanId { get; set; }
    }
}
