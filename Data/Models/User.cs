using Data.Enums;

namespace Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }

        public ICollection<TravelPlan> TravelPlans { get; set; } = new List<TravelPlan>();

        public User() { }

        public User(string name, string email, string password, Role role)
        {
            Name = name;
            Email = email;
            Password = password;
            Role = role;
        }
    }
}
