using HamiltonCourtFX.Emporos.ITInventory.Common.Entities;
using HamiltonCourtFX.Emporos.ITInventory.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace HamiltonCourtFX.Emporos.ITInventory.Infrastructure
{
    public class ITInventoryContext : DbContext, IITInventoryContext
    {
        public const string ConnStringName = "itinventorydb";
        
        private readonly IConfiguration configuration;

        public ITInventoryContext(IConfiguration configuration, DbContextOptions options) : base(options)
        {
            this.configuration = configuration;
        }

        public DbSet<Device> Devices { get; set; }
        public DbSet<Employee> Employees { get; set; }

        public void EnsureCreated()
        {
            this.Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connString = configuration.GetConnectionString(ConnStringName)!;
            optionsBuilder.UseSqlServer(connString);
            optionsBuilder.ConfigureWarnings(
                b => b.Log(
                    (RelationalEventId.ConnectionOpened, LogLevel.Information),
                    (RelationalEventId.ConnectionClosed, LogLevel.Information),
                    (RelationalEventId.TransactionStarted, LogLevel.Information),
                    (RelationalEventId.TransactionCommitted, LogLevel.Information)
                    ));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


        }
    }
}