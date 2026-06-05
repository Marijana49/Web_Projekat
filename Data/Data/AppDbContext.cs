using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Ignore<TravelPlan>();
            modelBuilder.Ignore<Destination>();
            modelBuilder.Ignore<Activity>();
        }
    }
}
