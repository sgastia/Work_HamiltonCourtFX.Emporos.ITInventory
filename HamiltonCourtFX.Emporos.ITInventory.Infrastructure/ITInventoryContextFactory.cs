using HamiltonCourtFX.Emporos.ITInventory.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HamiltonCourtFX.Emporos.ITInventory.Infrastructure
{
    public class ITInventoryContextFactory : IDesignTimeDbContextFactory<ITInventoryContext>, IITInventoryContextFactory
    {
        private readonly IConfiguration configuration;

        public ITInventoryContextFactory(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public ITInventoryContext CreateDbContext(string[] args)
        {
            if (args.Length != 1)
                throw new ArgumentException("Connection string has to be a parameter");
            string connString = args[0];
            DbContextOptionsBuilder optionsBuilder = new DbContextOptionsBuilder<ITInventoryContext>();
            optionsBuilder.UseSqlServer(connString);
            return new ITInventoryContext(configuration, optionsBuilder.Options);
        }

        public IITInventoryContext CreateDbContext()
        {
            string connString = configuration.GetConnectionString(ITInventoryContext.ConnStringName)!;
            DbContextOptionsBuilder optionsBuilder = new DbContextOptionsBuilder<ITInventoryContext>();
            optionsBuilder.UseSqlServer(connString);
            return new ITInventoryContext(configuration, optionsBuilder.Options);
        }
    }
}
