using AuthService.Services.Interface;
using Data.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.ServiceFabric.Services.Communication.AspNetCore;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System.Fabric;

namespace AuthService
{
    /// <summary>
    /// The FabricRuntime creates an instance of this class for each service type instance.
    /// </summary>
    internal sealed class AuthService : StatelessService
    {
        public AuthService(StatelessServiceContext context)
            : base(context)
        { }

        /// <summary>
        /// Optional override to create listeners (like tcp, http) for this service instance.
        /// </summary>
        /// <returns>The collection of listeners.</returns>
        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return new ServiceInstanceListener[]
            {
        new ServiceInstanceListener(serviceContext =>
            new KestrelCommunicationListener(serviceContext, "ServiceEndpoint", (url, listener) =>
            {
                var builder = WebApplication.CreateBuilder();

                builder.WebHost
                    .UseKestrel()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseServiceFabricIntegration(listener, ServiceFabricIntegrationOptions.None)
                    .UseUrls(url);

                builder.Services.AddDbContext<AppDbContext>(options =>
                    options.UseSqlServer("Server=.\\SQLEXPRESS;Database=TravelPlanDb;Trusted_Connection=True;TrustServerCertificate=True;"));

                builder.Services.AddScoped<IAuthService, global:: AuthService.Services.Service.AuthService>();

                builder.Services.AddControllers();
                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen();

                var app = builder.Build();

                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                app.UseAuthorization();
                app.MapControllers();

                return app;
            }))
            };
        }
    }
}
