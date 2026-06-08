using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Checklist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsChecked { get; set; }
        public int TravelPlanId { get; set; }
        public TravelPlan TravelPlan { get; set; }

        public Checklist() { }

        public Checklist(string name, bool isChecked, int travelPlanId)
        {
            Name = name;
            IsChecked = isChecked;
            TravelPlanId = travelPlanId;
        }
    }
}
