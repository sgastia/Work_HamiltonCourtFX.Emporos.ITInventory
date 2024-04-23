using HamiltonCourtFX.Emporos.ITInventory.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HamiltonCourtFX.Emporos.ITInventory.Common.Interfaces
{
    public interface IRepository
    {
        IList<Device> GetAllDevices();
        IList<Employee> GetAllEmployees();
    }
}
