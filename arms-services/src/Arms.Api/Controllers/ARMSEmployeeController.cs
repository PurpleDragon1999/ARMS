using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Arms.Application.Services.Users;
using Microsoft.AspNetCore.Http;
using Arms.Infrastructure;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Arms.Domain.CustomEntities;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Arms.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ARMSEmployeeController : BaseController
    {
        private readonly IIdentityService _identityService;
        ArmsDbContext _context;
        public ARMSEmployeeController(IIdentityService identityService, ArmsDbContext armsContext)
        {
            _identityService = identityService;
            _context = armsContext;
        }

        [HttpGet]
        public IActionResult GetARMSEmployee()
        {
            List<ARMSEmployee> employee = _context.ARMSEmployee;
            try
            {
                if (employee != null)
                {
                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            data = employee,
                            message = "Employee Records Retrieved Successfully"
                        }

                    };
                    return StatusCode(200, response);
                }
                else
                {
                    var response = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "Employee does not exist"
                        }

                    };
                    return StatusCode(404, response);
                }
            }
            catch (Exception e)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = e.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }
        }


        [HttpGet("{id}")]
        public IActionResult GetEmployee(int id)
        {
            var employee = _context.Interview.SingleOrDefault(c => c.Id == id);
            try
            {
                if (employee != null)
                {
                    var response = new
                    {
                        success = "true",
                        payload = new
                        {
                            data = employee,
                            message = "Employee Record Retrieved Successfully"
                        }

                    };
                    return StatusCode(200, response);

                }
                else
                {
                    var response = new
                    {
                        success = "true",
                        payload = new
                        {
                            message = "Employee Record with this ID does not exist"
                        }

                    };
                    return StatusCode(404, response);
                }
            }
            catch (Exception e)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = e.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }
        }

        [HttpPost]
        public IActionResult CreateEmployee([FromBody] CustomEmployee customDTO)
        {
            try
            {
                var employeeObj = new Employee
                {
                    Id = customDTO.Id,
                    Name = customDTO.Name,
                    Code = customDTO.Code,
                    Designation = customDTO.Designation,
                    Role = customDTO.Role,
                    Email = customDTO.Email,
                    CreatedBy = customDTO.CreatedBy,
                    ModifiedBy = customDTO.ModifiedBy,
                    CreatedAt = customDTO.ModifiedAt,
                    ModifiedAt = customDTO.ModifiedAt,
                };
                _context.Employee.Add(employeeObj);
                _context.SaveChanges();
                int id = employeeObj.Id;
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        message = "Employee Record Created Successfully"
                    }

                };
                return StatusCode(200, response);
            }
            catch (Exception e)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = e.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }
        }


        [HttpPatch("{id}")]
        public IActionResult UpdateEmployee(int id, [FromBody] Employee employeeObj)
        {
            var employee = _context.Employee.SingleOrDefault(c => c.Id == id);
            try
            {
                if (employee != null)
                {
                    if (employeeObj.Id != null)
                    {
                        employee.Id = employeeObj.Id;
                    }
                    if (employeeObj.Name != null)
                    {
                        employee.Name = employeeObj.Name;
                    }
                    if (employeeObj.Code != null)
                    {
                        employee.Code = employeeObj.Code;
                    }
                    if (employeeObj.Designation != 0)
                    {
                        employee.Designation = employeeObj.Designation;
                    }
                    if (employeeObj.Role != 0)
                    {
                        employee.Role = employeeObj.Role;
                    }
                    if (employeeObj.Email != 0)
                    {
                        employee.Email = employeeObj.Email;
                    }
                    _context.Employee.Update(employee);
                    _context.SaveChanges();
                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            message = "Employee Record Updated Successfully"
                        }
                    };
                    return StatusCode(200, response);
                }
                else
                {
                    var response = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "Employee does not exist"
                        }
                    };
                    return StatusCode(404, response);
                }
            }
            catch (Exception e)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = e.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _context.Employee.SingleOrDefault(c => c.Id == id);
            try
            {
                if (employee != null)
                {
                    _context.Employee.Remove(employee);
                    _context.SaveChanges();
                    var response = new
                    {
                        success = "true",
                        payload = new
                        {
                            message = "Employee Record Deleted Successfully"
                        }
                    };
                    return StatusCode(200, response);
                }
                else
                {
                    var response = new
                    {
                        success = "true",
                        payload = new
                        {
                            message = "Employee does not exist"
                        }
                    };
                    return StatusCode(404, response);
                }
            }
            catch (Exception e)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = e.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }
        }


    }
}
