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
        public DbSet<TravelPlan> TravelPlans { get; set; }
        public DbSet<Destination> Destinations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TravelPlan>()
                .HasOne(tp => tp.User)
                .WithMany(u => u.TravelPlans)
                .HasForeignKey(tp => tp.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Destination>()
                .HasOne(d => d.TravelPlan)
                .WithMany(tp => tp.Destinations)
                .HasForeignKey(d => d.TravelPlanId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
