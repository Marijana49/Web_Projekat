using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Data.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            /*var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "..", "TravelService"))
                .AddJsonFile("appsettings.json", optional: true)
                .Build();

            var builder = new DbContextOptionsBuilder<AppDbContext>();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrEmpty(connectionString))
            {
                connectionString = "Server=localhost;Database=TravelServiceDb;Trusted_Connection=True;TrustServerCertificate=True;";
            }

            builder.UseSqlServer(connectionString);

            return new AppDbContext(builder.Options);*/
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            var connectionString = "Server=Marijana\\SQLEXPRESS;Database=User_db;Trusted_Connection=True;TrustServerCertificate=True;";

            optionsBuilder.UseSqlServer(connectionString);
            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
