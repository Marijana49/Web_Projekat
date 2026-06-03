namespace Data.DTOs
{
    public class CreateDestinationDto
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public DateOnly ArrivalDate { get; set; }
        public DateOnly DepartureDate { get; set; }
        public string Description { get; set; }

        public int TravelPlanId { get; set; }
    }
}
