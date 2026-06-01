namespace Data.DTOs
{
    public class UpdateTravelPlanDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public double? Budget { get; set; }
        public string? Notes { get; set; }
        public int UserId { get; set; }
    }
}
