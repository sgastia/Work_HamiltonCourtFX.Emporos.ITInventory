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
    }
}
