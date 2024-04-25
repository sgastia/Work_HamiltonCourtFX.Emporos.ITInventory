
using HamiltonCourtFX.Emporos.ITInventory.Common.Configuration;
using HamiltonCourtFX.Emporos.ITInventory.Common.Interfaces;
using HamiltonCourtFX.Emporos.ITInventory.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HamiltonCourtFX.Emporos.ITInventory.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            AddConfiguration(builder, args, builder.Environment);

            // Add services to the container.
            AddServices(builder);

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }

        private static void AddConfiguration(WebApplicationBuilder builder, string[] args, IWebHostEnvironment env)
        {
            IGeneralOptions options = new GeneralOptions();
            builder.Configuration
                .AddCommandLine(args)
                .Build()
                .Bind(options);
            builder.Configuration
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
                .Build()
                .GetSection(nameof(GeneralOptions))
                .Bind(options);
            builder.Services.AddSingleton<IGeneralOptions>(options);
        }

        private static void AddServices(WebApplicationBuilder builder)
        {
            string connString = builder.Configuration.GetConnectionString(ITInventoryContext.ConnStringName)!;
            if (string.IsNullOrEmpty(connString))
                throw new ArgumentException($"Connection string for DB '{ITInventoryContext.ConnStringName}' can't be null neither empty");

            //https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/
            builder.Services.AddDbContext<ITInventoryContext>(options =>
            {
                options.UseSqlServer(connString);
            });
            builder.Services.AddDbContextFactory<ITInventoryContext>(options =>
            {
                options.UseSqlServer(connString);
            }, ServiceLifetime.Scoped);

            builder.Services.AddScoped<IRepository, ITInventoryRepository>();
            builder.Services.AddScoped<IITInventoryContext, ITInventoryContext>();
            builder.Services.AddScoped<IITInventoryContextFactory, ITInventoryContextFactory>();
        }
    }
}
