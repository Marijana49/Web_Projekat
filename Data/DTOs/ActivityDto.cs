using Data.Enums;

namespace Data.DTOs
{
    public class ActivityDto
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
        public int? DestinationId { get; set; }
    }
}
