using Data.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.ServiceFabric.Services.Communication.AspNetCore;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System.Fabric;
using TravelService.Services.Interface;

namespace TravelService
{
    /// <summary>
    /// The FabricRuntime creates an instance of this class for each service type instance.
    /// </summary>
    internal sealed class TravelService : StatelessService
    {
        public TravelService(StatelessServiceContext context)
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
                        ServiceEventSource.Current.ServiceMessage(serviceContext, $"Starting Kestrel on {url}");

                        var builder = WebApplication.CreateBuilder();

                        var codePath = serviceContext.CodePackageActivationContext.GetCodePackageObject("Code").Path;
                        builder.Configuration
                            .SetBasePath(codePath)
                            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

                        builder.Services.AddSingleton<StatelessServiceContext>(serviceContext);

                        builder.Services.AddCors(options =>
                        {
                            options.AddPolicy("AllowReactApp", policy =>
                            {
                                policy.WithOrigins("http://localhost:5173")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                            });
                        });

                        builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

                        builder.Services.AddScoped<ITravelService, Services.Service.TravelPlanService>();
                        builder.Services.AddScoped<IDestinationService, Services.Service.DestinationService>();

                        builder.WebHost
                                    .UseKestrel()
                                    .UseContentRoot(Directory.GetCurrentDirectory())
                                    .UseServiceFabricIntegration(listener, ServiceFabricIntegrationOptions.None)
                                    .UseUrls(url);

                        builder.Services.AddControllers();
                        builder.Services.AddEndpointsApiExplorer();
                        builder.Services.AddSwaggerGen();

                        var app = builder.Build();

                        if (app.Environment.IsDevelopment())
                        {
                            app.UseSwagger();
                            app.UseSwaggerUI();
                        }

                        using (var scope = app.Services.CreateScope())
                        {
                            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                            dbContext.Database.EnsureCreated();
                        }

                        app.UseCors("AllowReactApp");

                        app.UseAuthorization();
                        app.MapControllers();

                        return app;

                    }))
            };
        }
    }
}
