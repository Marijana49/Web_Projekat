using Data.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.ServiceFabric.Services.Communication.AspNetCore;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System.Fabric;
using System.Security.Claims;
using System.Text;
using TravelService.Middleware;
using TravelService.Services.Interface;
using TravelService.Services.Service;

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

                        builder.WebHost
                        .UseKestrel()
                        .UseContentRoot(Directory.GetCurrentDirectory())
                        .UseServiceFabricIntegration(listener, ServiceFabricIntegrationOptions.None)
                        .UseUrls(url);

                        builder.Configuration
                        .SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

                        builder.Services.AddSingleton<StatelessServiceContext>(serviceContext);

                        builder.Services.AddCors(options =>
                        {
                            options.AddPolicy("AllowReactApp", policy =>
                            {
                                policy.SetIsOriginAllowed(origin =>
                                        origin.StartsWith("http://localhost:5173") ||
                                        origin.StartsWith("http://192.168."))
                                      .AllowAnyHeader()
                                      .AllowAnyMethod();
                            });
                        });

                        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                        .AddJwtBearer(options =>
                        {
                            options.TokenValidationParameters = new TokenValidationParameters
                            {
                                ValidateIssuerSigningKey = true,
                                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                                ValidateIssuer = true,
                                ValidIssuer = "MojAuthService",
                                ValidateAudience = false,
                                RoleClaimType = ClaimTypes.Role
                            };
                        });

                        builder.Services.AddAuthorization();

                        builder.Services.AddDbContext<TravelPlanDbContext>(options =>
                        options.UseSqlServer(
                            builder.Configuration.GetConnectionString("DefaultConnection"),
                            x => x.MigrationsHistoryTable("__EFMigrationsHistory_Travel")
                        )
                        );

                        builder.Services.AddScoped<ITravelService, Services.Service.TravelPlanService>();
                        builder.Services.AddScoped<IDestinationService, Services.Service.DestinationService>();
                        builder.Services.AddScoped<IActivityService, Services.Service.ActivityService>();
                        builder.Services.AddScoped<IExpenseService, Services.Service.ExpenseService>();
                        builder.Services.AddScoped<IBudgetService, Services.Service.BudgetService>();
                        builder.Services.AddScoped<IChecklistService, Services.Service.ChecklistService>();

                        builder.Services.AddHttpClient<IShareTokenValidator, ShareTokenValidator>(client =>
                        {
                            client.BaseAddress = new Uri("http://localhost:19081/Backend/SharingService/");
                        });

                        builder.Services.AddControllers();
                        builder.Services.AddEndpointsApiExplorer();
                        builder.Services.AddSwaggerGen();

                        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
                        builder.Services.AddProblemDetails();

                        var app = builder.Build();

                        if (app.Environment.IsDevelopment())
                        {
                            app.UseSwagger();
                            app.UseSwaggerUI();
                        }

                        app.UseCors("AllowReactApp");

                        app.UseAuthentication();
                        app.UseAuthorization();
                        app.UseExceptionHandler();
                        app.MapControllers();

                        return app;

                    }))
            };
        }
    }
}
