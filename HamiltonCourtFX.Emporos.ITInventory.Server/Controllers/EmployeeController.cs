using HamiltonCourtFX.Emporos.ITInventory.Common.Entities;
using HamiltonCourtFX.Emporos.ITInventory.Common.Interfaces;
using HamiltonCourtFX.Emporos.ITInventory.Server.Models;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HamiltonCourtFX.Emporos.ITInventory.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IRepository repository;

        public EmployeeController(IRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public ActionResult<IEnumerable<Employee>> Get()
        {
            IList<Employee> employees = repository.GetAllEmployees();
            return Ok(employees);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public ActionResult<Employee> Get(int id)
        {
            Employee? employee = repository.GetEmployeeBy(id);
            return Ok(employee);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public void Post([FromBody] Employee employee)
        {
            repository.Save(employee);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Employee employee)
        {
            repository.Update(id, employee);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            repository.DeleteEmployee(id);
        }

        [HttpPost]
        [Route("relatedevice")]
        public ActionResult<ResponseMessage> RelateDevice([FromBody]EmployeeDeviceRelationship employeeDeviceRelationship)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            try
            {
                repository.RelateDevice(employeeDeviceRelationship.EmployeeId, employeeDeviceRelationship.DeviceId);
                responseMessage.IsOk = true;
                responseMessage.Message = "Data modified";
                return Ok(responseMessage);
            }
            catch (Exception ex)
            {
                responseMessage.IsOk = false;
                responseMessage.Message = ex.Message;
                return Ok(responseMessage);
            }
        }

    }
}
