using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Data
{
    public class TravelPlanDbContext : DbContext
    {
        public TravelPlanDbContext(DbContextOptions<TravelPlanDbContext> options) : base(options)
        {
        }

        public DbSet<TravelPlan> TravelPlans { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Activity> Activitys { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Ignore<User>();

            modelBuilder.Entity<Destination>()
                .HasOne(d => d.TravelPlan)
                .WithMany(tp => tp.Destinations)
                .HasForeignKey(d => d.TravelPlanId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Activity>()
                .HasOne(a => a.TravelPlan)
                .WithMany(tp => tp.Activitys)
                .HasForeignKey(a => a.TravelPlanId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Activity>()
                .HasOne(a => a.Destination)
                .WithMany(d => d.Activitys)
                .HasForeignKey(a => a.DestinationId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
