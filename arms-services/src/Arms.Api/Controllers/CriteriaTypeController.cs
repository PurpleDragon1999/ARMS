using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arms.Application.Services.Users;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using System.Web.Http;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;


namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CriteriaTypeController :BaseController
    {
        private readonly IIdentityService _identityService;
        ArmsDbContext _context;
        public CriteriaTypeController(IIdentityService identityService, ArmsDbContext armsContext)
        {
            _identityService = identityService;
            _context = armsContext;
        }
        //GET:api/CriteriaType
        [HttpGet]
        public IActionResult GetCriteriaTypes()
        {
            try
            {
                List<CriteriaType> criteriaTypes = _context.CriteriaType.ToList();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = criteriaTypes,
                        message = "Criteria Types Retrieved Successfully"
                    }

                };
                return StatusCode(200, response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    success = "false",
                    payload = new
                    {
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }

        }


        //GET:api/criteriaType/id
        [HttpGet("{id}")]

        public IActionResult GetCriteriaType(int id)
        {

            try
            {
                CriteriaType criteria = _context.CriteriaType.Include(l => l.roundType).
                    SingleOrDefault(c => c.Id == id);



                if (criteria == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "This Criteria Type Does Not Exist"
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
                            data = criteria,
                            message = "Criteria Type Retrieved Successfully"
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

        //POST:api/CriteriaType
        [HttpPost]
        public IActionResult CreateCriteriaType(CriteriaType criteria)
        {
            try
            {
                CriteriaType checkinDb = _context.CriteriaType.SingleOrDefault(c => c.criteriaName == criteria.criteriaName);
                if (checkinDb != null)
                {
                    var resAlreadyExists = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "Criteria Type with this Criteria Name already exists"
                        }

                    };
                    return StatusCode(400, resAlreadyExists);
                }
                CriteriaType criteriaObj = new CriteriaType
                {
                    criteriaName = criteria.criteriaName,
                      roundTypeId=criteria.roundTypeId

                };
                _context.CriteriaType.Add(criteriaObj);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = criteriaObj,
                        message = " Criteria Type Created Successfully"
                    }

                };
                return StatusCode(201, response);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.GetType().FullName);
                Console.WriteLine(ex.Message);
                var response = new
                {
                    success = "false",
                    payload = new
                    {
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        //PUT:api/ CriteriaType/id
        [HttpPut("{id}")]
        public IActionResult UpdateCriteriaType(int id, CriteriaType criteria)
        {
            try
            {
                CriteriaType criteriaType = _context.CriteriaType.SingleOrDefault(c => c.Id == id);
                if (criteriaType == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {

                            message = "This Criteria Type does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }

                criteriaType.criteriaName = criteria.criteriaName;
                criteriaType.roundTypeId = criteria.roundTypeId;

                
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = criteriaType,
                        message = " Criteria Type Updated Successfully"
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
        //DELETE:/api/ CriteriaType/id
        [HttpDelete("{id}")]
        public IActionResult DeleteCriteriaType(int id)
        {
            try
            {
                CriteriaType criteria = _context.CriteriaType.SingleOrDefault(c => c.Id == id);
                if (criteria == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {

                            message = "This  Criteria Type does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }
                _context.CriteriaType.Remove(criteria);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        message = "Criteria Type Deleted Successfully"
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
