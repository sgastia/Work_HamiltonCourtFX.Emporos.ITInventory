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
        public ITInventoryRepository() 
        { 
        
        }

        public IList<Device> GetAllDevices()
        {
            var devices = new List<Device>();
            devices.Add(new Device()
            {
                Id = 1,
                Description="Samsung S24",
                DeviceType= Common.DeviceType.SmartPhone
            });
            return devices;
        }

        public IList<Employee> GetAllEmployees()
        {
            var employees = new List<Employee>();
            employees.Add(new Employee()
            {
                Id = 1,
                Name = "Sebastian",
                Email = "sgastia@gmail.com"
            });
            return employees;
        }
    }
}
