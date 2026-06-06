using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Data.Data
{
    public class TravelPlanDbContextFactory : IDesignTimeDbContextFactory<TravelPlanDbContext>
    {
        public TravelPlanDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TravelPlanDbContext>();
            optionsBuilder.UseSqlServer("Server=Marijana\\SQLEXPRESS;Database=TravelPlan_db;Trusted_Connection=True;TrustServerCertificate=True;");
            return new TravelPlanDbContext(optionsBuilder.Options);
        }
    }
}
