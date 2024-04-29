using HamiltonCourtFX.Emporos.ITInventory.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HamiltonCourtFX.Emporos.ITInventory.Common.Interfaces
{
    public interface IITInventoryContext : IDisposable
    {
        void EnsureCreated();
        IList<Device> GetAllDevices();
        IList<Employee> GetAllEmployees();
        void Save(Device device);
        void Save(Employee employee);
        Employee? GetEmployeeBy(int id);
        Device? GetDeviceBy(int id);
        void Update(int id, Device device);
        void Update(int id, Employee employee);
        void DeleteDevice(int id);
        void DeleteEmployee(int id);
        void RelateToEmployee(Device device, int? employeeId);
    }
}
