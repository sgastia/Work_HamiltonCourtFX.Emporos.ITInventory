using System.ComponentModel.DataAnnotations;

namespace HamiltonCourtFX.Emporos.ITInventory.Common.Entities
{
    [Serializable]
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        public List<Device> Devices { get; set; }

        public Employee() 
        {
            Devices = new List<Device>();
        }
    }
}
