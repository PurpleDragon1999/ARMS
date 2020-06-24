using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arms.Domain.CustomEntities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Arms.Api.Controllers
{

    public class EmployeeModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }

    [Route("api/employee")]
    [ApiController]
    [AllowAnonymous]
    public class EmployeeController : Controller
    {
        ArmsDbContext _context;
        public EmployeeController(ArmsDbContext armsContext)
        {
            _context = armsContext;
        }

        [HttpGet("{keyword}")]
        public async Task<IActionResult> Search(string keyword)
        {
            Response response = new Response()
            {
                payload = new Payload()
            };
            try
            {
                var employees = from emp in _context.ArmsEmployees select new EmployeeModel { Id = emp.Id, FirstName = emp.FirstName, LastName = emp.LastName, Email = emp.Email};
                if (!String.IsNullOrEmpty(keyword))
                {
                    employees = employees.Where(e => e.FirstName.Contains(keyword));
                }
                response.success = "true";
                response.payload.data = await employees.ToListAsync();
                return StatusCode(200, response);
            }
            catch(Exception e)
            {
                response.success = "false";
                response.payload.msg = "Some Error Occured. Details: " + e.Message;
                return StatusCode(500, response);
            }
            
        }
    }
}