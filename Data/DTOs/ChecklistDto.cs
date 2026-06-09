namespace Data.DTOs
{
    public class ChecklistDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsChecked { get; set; }
        public int TravelPlanId { get; set; }
    }
}
