using HamiltonCourtFX.Emporos.ITInventory.Common.Entities;
using HamiltonCourtFX.Emporos.ITInventory.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HamiltonCourtFX.Emporos.ITInventory.Infrastructure
{
    public class ITInventoryRepository : IRepository
    {
        private readonly IITInventoryContextFactory itContextFactory;

        public ITInventoryRepository(IITInventoryContextFactory itContextFactory) 
        {
            this.itContextFactory = itContextFactory;
        }

        public void DeleteDevice(int id)
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                context.DeleteDevice(id);
            }
        }

        public void DeleteEmployee(int id)
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                context.DeleteEmployee(id);
            }
        }

        public void EnsureCreated()
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                context.EnsureCreated();
            }
        }

        public IList<Device> GetAllDevices()
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                return context.GetAllDevices();
            }
        }

        public IList<Employee> GetAllEmployees()
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                return context.GetAllEmployees();
            }
        }

        public Device? GetDeviceBy(int id)
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                return context.GetDeviceBy(id);
            }
        }

        public Employee? GetEmployeeBy(int id)
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                return context.GetEmployeeBy(id);
            }
        }

        public Device Save(Device device)
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                context.Save(device);
                return device;
            }
        }

        public Employee Save(Employee employee)
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                context.Save(employee);
                return employee;
            }
        }

        public void Update(int id, Device device)
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                context.Update(id, device);
            }
        }

        public void Update(int id, Employee employee)
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                context.Update(id, employee);
            }
        }

        public void RelateDevice(int employeeId, int deviceId)
        {
            using (IITInventoryContext context = itContextFactory.CreateDbContext())
            {
                Device? device = context.GetDeviceBy(deviceId);
                if (device == null)
                {
                    throw new ArgumentException($"Device for id={deviceId} doesn't exists");
                }

                if(device.EmployeeId == null)
                {
                    context.RelateToEmployee(device, employeeId);
                    return;
                }

                if(device.EmployeeId.Value ==  employeeId)
                {
                    context.RelateToEmployee(device, null);
                    return;
                }

                if(device.EmployeeId.Value != employeeId)
                {
                    context.RelateToEmployee(device, employeeId);
                    return;
                }

                throw new InvalidOperationException($"It can't relate deviceId={deviceId} with employeeId={employeeId}");
            }
        }
    }
}
