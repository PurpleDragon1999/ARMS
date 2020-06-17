using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arms.Application.Services.Users;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmploymentTypeController : ControllerBase
    {
        private readonly IIdentityService _identityService;
        ArmsDbContext _context;
        public EmploymentTypeController(IIdentityService identityService, ArmsDbContext armsContext)
        {
            _identityService = identityService;
            _context = armsContext;
        }
        //GET:api/employementType
        [HttpGet]
        public IActionResult GetEmploymentTypes()
        {
            try
            {
                List<EmploymentType> employmentTypes = _context.employmentType.ToList();
                var response = new
                {
                    success = "true",
                    payload = new
                    {
                        data = employmentTypes,
                        message = "Employment Types Retrieved Successfully"
                    }

                };
                return StatusCode(200, response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = ex.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetEmploymentTypeById(int id)
        {
            try
            {
                EmploymentType employmentType = _context.employmentType.SingleOrDefault(c => c.Id == id);
                if (employmentType == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "This Employment Type does not exist"
                        }
                    };
                    return StatusCode(404, resNull);
                }
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = employmentType,
                        message = "Employment Type Retrieved Successfully"
                    }

                };
                return StatusCode(200, response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = ex.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        [HttpPost]
        public IActionResult CreateEmploymentType(EmploymentType employmentType)
        {
            try
            {
                EmploymentType empType = _context.employmentType.SingleOrDefault
                    (c => c.employmentTypeName == employmentType.employmentTypeName);
                if (empType != null)
                {
                    var resAlreadyExists = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "This Employment Type already exists"
                        }

                    };
                    return StatusCode(400, resAlreadyExists);
                }
                EmploymentType newEmploymentType = new EmploymentType
                {
                    employmentTypeName = employmentType.employmentTypeName
                };
                _context.employmentType.Add(newEmploymentType);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = newEmploymentType,
                        message = "Employment Type Created Successfully"
                    }

                };
                return StatusCode(201, response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = ex.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }
        }

        //PUT:api/employmentType/id
        [HttpPut("{id}")]
        public IActionResult UpdateEmploymentType(int id, [FromBody]EmploymentType employmentType)
        {
            try
            {
                EmploymentType empTypeInDb = _context.employmentType.SingleOrDefault(c => c.Id == id);
                if (empTypeInDb == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "This Employment Type does not exist"
                        }
                    };
                    return StatusCode(404, resNull);

                }
                empTypeInDb.employmentTypeName = employmentType.employmentTypeName;
                _context.employmentType.Update(empTypeInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = empTypeInDb,
                        message = "Employment Type Updated Successfully"
                    }

                };
                return StatusCode(200, response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = ex.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteEmploymentType(int id)
        {
            try
            {
                EmploymentType empTypeInDb = _context.employmentType.SingleOrDefault(c => c.Id == id);
                if (empTypeInDb == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "This Employment Type does not exist"
                        }
                    };
                    return StatusCode(404, resNull);

                }

                _context.employmentType.Remove(empTypeInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {

                        message = "Employment Type Deleted Successfully"
                    }

                };
                return StatusCode(200, response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = ex.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }


        }
    }

}