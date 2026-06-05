using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
