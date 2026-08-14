using Data.Enums;

namespace Data.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public double Budget { get; set; }
        public ActivityStatus Status { get; set; }

        public int TravelPlanId { get; set; }
        public TravelPlan TravelPlan { get; set; }
        public int? DestinationId { get; set; }
        public Destination Destination { get; set; }

        public double? Latitude { get; set; }
        public double? Longitude { get; set; }

        public Activity() { }

        public Activity(string name, DateOnly date, TimeOnly time, string location, string description, double budget, ActivityStatus status)
        {
            Name = name;
            Date = date;
            Time = time;
            Location = location;
            Description = description;
            Budget = budget;
            Status = status;
        }
    }
}
