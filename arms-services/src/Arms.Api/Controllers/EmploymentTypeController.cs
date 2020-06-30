using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arms.Api.Middlewares;
using Arms.Application.Services.Users;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  
    public class EmploymentTypeController : BaseController
    {
       
        ArmsDbContext _context;
        public EmploymentTypeController( ArmsDbContext armsContext)
        {
           _context = armsContext;
        }
        //GET:api/employementType
        [HttpGet]
        [Authorize(Roles ="SuperAdministrator,Admin")]
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        [HttpGet("{id}")]
        [Authorize(Roles = "SuperAdministrator")]
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        [HttpPost]
        [Authorize(Roles = "SuperAdministrator")]
        public IActionResult CreateEmploymentType(List<EmploymentType> employmentType)
        {
                try
                {
                TokenDecoder decodedToken = new TokenDecoder(Request);
                for (int i = 0; i < employmentType.Count; i++)
                {
                    EmploymentType empType = _context.employmentType.SingleOrDefault
                        (c => c.employmentTypeName == employmentType[i].employmentTypeName);
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
                        employmentTypeName = employmentType[i].employmentTypeName,
                        createdBy = decodedToken.id,
                        modifiedBy = decodedToken.id
                    };
                    _context.employmentType.Add(newEmploymentType);
                    _context.SaveChanges();
                }
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = employmentType,
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }

        //PUT:api/employmentType/id
        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdministrator")]
        public IActionResult UpdateEmploymentType(int id, [FromBody]EmploymentType employmentType)
        {
            try
            {
                TokenDecoder decodedToken = new TokenDecoder(Request);
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
                empTypeInDb.modifiedBy = decodedToken.id;
                    
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdministrator")]
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }


        }
    }

}