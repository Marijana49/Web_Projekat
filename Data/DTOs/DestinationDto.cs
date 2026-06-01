using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs
{
    public class DestinationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateOnly ArrivalDate { get; set; }
        public DateOnly DepartureDate { get; set; }
        public string Description { get; set; }
    }
}
