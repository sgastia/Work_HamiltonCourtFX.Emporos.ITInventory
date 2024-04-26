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

        public IList<Device> GetAllDevices()
        {
            return Devices.ToList();
        }
        public IList<Employee> GetAllEmployees()
        {
            return Employees.ToList();
        }

        public void Save(Device device)
        {
            Devices.Add(device);
            SaveChanges();
        }
        public void Save(Employee employee)
        {
            Employees.Add(employee);
            SaveChanges();
        }
        public Employee? GetEmployeeBy(int id)
        {
            return Employees.Where(e => e.Id == id).SingleOrDefault();
        }
        public Device? GetDeviceBy(int id)
        {
            return Devices.Where(e => e.Id == id).SingleOrDefault();
        }
        public void Update(int id, Device device)
        {
            Device oldDevice = Devices.Where(e => e.Id == id).Single();
            oldDevice.Description = device.Description;
            oldDevice.DeviceType = device.DeviceType;
            SaveChanges();
        }
        public void Update(int id, Employee employee)
        {
            Employee oldEmployee = Employees.Where(e => e.Id == id).Single();
            oldEmployee.Email = employee.Email;
            oldEmployee.Name = employee.Name;
            SaveChanges();
        }
        public void DeleteDevice(int id)
        {
            Device device = Devices.Where(e => e.Id == id).Single();
            Devices.Remove(device);
            SaveChanges();
        }
        public void DeleteEmployee(int id)
        {
            Employee employee = Employees.Where(e => e.Id == id).Single();
            Employees.Remove(employee);
            SaveChanges();
        }

    }
}