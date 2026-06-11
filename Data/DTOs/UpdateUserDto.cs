using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs
{
    public class UpdateUserDto
    {
        [Required(ErrorMessage = "Uloga je obavezna!")]
        public string newRole {  get; set; }
    }
}
