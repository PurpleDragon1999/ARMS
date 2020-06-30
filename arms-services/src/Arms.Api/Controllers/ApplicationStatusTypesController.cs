using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arms.Application.Services.Users;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using System.Web.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Arms.Api.Middlewares;

namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class ApplicationStatusTypesController : ControllerBase
    {
        ArmsDbContext _context;
       
        public ApplicationStatusTypesController(ArmsDbContext armsContext)
        {
            _context = armsContext;
        }
    
        [HttpGet]
        [Authorize(Roles ="Admin,SuperAdministrator")]
        public IActionResult GetAllStatusTypes()
        {
            try
            {
                List<ApplicationStatusType> statusTypes = _context.ApplicationStatusType.ToList();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = statusTypes,
                        message = "Application status types retrieved successfully"
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
        public IActionResult GetStatusTypeById(int id)
        {
            try
            {
                ApplicationStatusType statusType = _context.ApplicationStatusType.
                    SingleOrDefault(c => c.Id == id);
                
                if (statusType == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "Application status type does not exist"
                        }
                    };
                    return StatusCode(404, resNull);
                }
                else
                {
                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            data = statusType,
                            message = "Application status type retrieved successfully"
                        }
                    };
                    return StatusCode(200, response);
                }
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


        public IActionResult CreateStatusType(List<ApplicationStatusType> statusType)
        {
            try
            {
                TokenDecoder decodedToken = new TokenDecoder(Request);
                for (int i = 0; i < statusType.Count; i++)
                {
                    ApplicationStatusType checkinDb = _context.ApplicationStatusType.SingleOrDefault(c => c.StatusName == statusType[i].StatusName);
                    if (checkinDb != null)
                    {
                        var resAlreadyExists = new
                        {
                            success = false,
                            payload = new
                            {
                                message = "Application status type already exists"
                            }
                        };
                        return StatusCode(400, resAlreadyExists);
                    }

                    ApplicationStatusType newStatusType = new ApplicationStatusType
                    {
                        StatusName = statusType[i].StatusName,
                        CreatedBy = decodedToken.id,
                        ModifiedBy =decodedToken.id 
                    };
                    _context.ApplicationStatusType.Add(newStatusType);
                    _context.SaveChanges();
                }
                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            data = statusType,
                            message = "Application status type created successfully"
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


        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdministrator")]
        public IActionResult UpdateStatusType(int id, ApplicationStatusType statusType)
        {
            try
            {
                TokenDecoder decodedToken = new TokenDecoder(Request);
                ApplicationStatusType statusTypeInDb = _context.ApplicationStatusType.SingleOrDefault(c => c.Id == id);
                if (statusTypeInDb == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "Application status type does not exist"
                        }
                    };
                    return StatusCode(404, resNull);
                }

                if (statusType.StatusName != null)
                    statusTypeInDb.StatusName = decodedToken.id;

                if (statusType.ModifiedBy != null)
                    statusTypeInDb.ModifiedBy = decodedToken.id;

                _context.SaveChanges();

                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = statusTypeInDb,
                        message = "Application status type updated successfully"
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
        public IActionResult DeleteStatusType(int id)
        {
            try
            {
                ApplicationStatusType statusTypeInDb = _context.ApplicationStatusType.SingleOrDefault(c => c.Id == id);
                if (statusTypeInDb == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "Application status type does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }
                _context.ApplicationStatusType.Remove(statusTypeInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        message = "Application status type deleted successfully"
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