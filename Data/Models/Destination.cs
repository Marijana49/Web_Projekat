namespace Data.Models
{
    public class Destination
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateOnly ArrivalDate { get; set; }
        public DateOnly DepartureDate { get; set; }
        public string Description { get; set; }

        public int TravelPlanId { get; set; }
        public TravelPlan TravelPlan { get; set; }
        public ICollection<Activity> Activitys { get; set; } = new List<Activity>();

        public Destination() { }

        public Destination(string name, string location, DateOnly arrivalDate, DateOnly departureDate, string description)
        {
            Name = name;
            Location = location;
            ArrivalDate = arrivalDate;
            DepartureDate = departureDate;
            Description = description;
        }
    }
}
