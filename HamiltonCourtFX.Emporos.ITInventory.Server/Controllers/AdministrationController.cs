using HamiltonCourtFX.Emporos.ITInventory.Common.Entities;
using HamiltonCourtFX.Emporos.ITInventory.Common.Interfaces;
using HamiltonCourtFX.Emporos.ITInventory.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Xml.Linq;

namespace HamiltonCourtFX.Emporos.ITInventory.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministrationController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly IRepository repository;

        public AdministrationController(IConfiguration configuration, IRepository repository) 
        {
            this.configuration = configuration;
            this.repository = repository;
        }
        [HttpGet]
        [Route("testdbconnection")]
        public ActionResult TestDBConnection()
        {
            string connString = configuration.GetConnectionString(ITInventoryContext.ConnStringName)!;
            DateTime dbDateTime;

            using (SqlConnection conn = new SqlConnection(connString))
            {
                try
                {
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = "select SYSDATETIME()";
                        conn.Open();
                        object objDate = cmd.ExecuteScalar();
                        dbDateTime = (DateTime)objDate;
                    }
                }
                finally
                {
                    conn.Close();
                }
            }
            return Ok(dbDateTime);

        }

        [HttpGet]
        [Route("createdatabase")]

        public ActionResult CreateDatabase()
        {
            try
            {
                // Creates the database if not exists
                repository.EnsureCreated();
                return Ok("DB Created");
            }
            catch (Exception ex)
            {
                //TODO: log exception
                return base.StatusCode((int)HttpStatusCode.InternalServerError, ex.ToString());
            }

            
        }
    }
}
