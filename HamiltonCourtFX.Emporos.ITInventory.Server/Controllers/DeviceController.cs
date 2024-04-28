using HamiltonCourtFX.Emporos.ITInventory.Common.Entities;
using HamiltonCourtFX.Emporos.ITInventory.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HamiltonCourtFX.Emporos.ITInventory.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly IRepository repository;

        public DeviceController(IRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/<DeviceController>
        [HttpGet]
        public ActionResult<IEnumerable<Device>> Get()
        {
            IList<Device> devices = repository.GetAllDevices();
            return Ok(devices);
        }

        // GET api/<DeviceController>/5
        [HttpGet("{id}")]
        public ActionResult<Device> Get(int id)
        {
            Device device = repository.GetDeviceBy(id);
            return Ok(device);
        }

        // POST api/<DeviceController>
        [HttpPost]
        public ActionResult<Device> Post([FromBody] Device device)
        {
            Device newDevice = repository.Save(device);
            return Ok(newDevice);
        }

        // PUT api/<DeviceController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Device device)
        {
            repository.Update(id, device);
        }

        // DELETE api/<DeviceController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            repository.DeleteDevice(id);
        }
    }
}
