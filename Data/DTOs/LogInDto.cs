using System.ComponentModel.DataAnnotations;

namespace Data.DTOs
{
    public class LogInDto
    {
        [Required(ErrorMessage = "Email je obavezan!")]
        [EmailAddress(ErrorMessage = "Format email-a nije ispravan!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Lozinka je obavezna!")]
        [MinLength(6, ErrorMessage = "Lozinka mora imati barem 6 karaktera!")]
        public string Password { get; set; }
    }
}
