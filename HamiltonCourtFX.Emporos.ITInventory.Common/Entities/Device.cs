using HamiltonCourtFX.Emporos.ITInventory.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HamiltonCourtFX.Emporos.ITInventory.Common.Entities
{
    [Serializable]
    public class Device
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public DeviceType DeviceType { get; set; }

        public string Description { get; set; }
    }
}
