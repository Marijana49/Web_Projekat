using Microsoft.EntityFrameworkCore;
using TravelService.Models.Entity;

namespace TravelService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TravelPlan> TravelPlans { get; set; }
    }
}
