using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs
{
    public class CreateChecklistItemDto
    {
        public string Name { get; set; }

        public bool IsChecked { get; set; }

        public int TravelPlanId { get; set; }
    }
}
