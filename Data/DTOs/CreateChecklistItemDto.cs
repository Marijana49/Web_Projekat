using System.ComponentModel.DataAnnotations;

namespace Data.DTOs
{
    public class CreateChecklistItemDto
    {
        [Required(ErrorMessage = "Unesite naziv!")]
        public string Name { get; set; }

        public bool IsChecked { get; set; }

        public int TravelPlanId { get; set; }
    }
}
