using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class TravelPlan
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public double Budget { get; set; }
        public string Notes { get; set; }

        public TravelPlan() { }

        public TravelPlan(string name, string description, DateOnly startDate, DateOnly endDate, double budget, string notes)
        {
            Name = name;
            Description = description;
            StartDate = startDate;
            EndDate = endDate;
            Budget = budget;
            Notes = notes;
        }
    }
}
