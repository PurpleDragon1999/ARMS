using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    [Authorize]
    public class EligibilityCriteriaController : BaseController
    {
        private readonly IIdentityService _identityService;
        ArmsDbContext _context;
        public EligibilityCriteriaController( ArmsDbContext armsContext)
        {
           _context = armsContext;
        }
        //GET:api/eligibilityCriteria
        [HttpGet]
        public IActionResult GetEligibilityCriterias()
        {
            try
            {
                List<EligibilityCriteria> eligibilityCriterias = _context.eligibilityCriteria.ToList();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = eligibilityCriterias,
                        message = "Eligibility Criterias Retrieved Successfully"
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
        //GET:api/eligibilityCriteira/id
        [HttpGet("{id}")]
        public IActionResult GetEligibilityCriteriaById(int id)
        {
            try
            {
                EligibilityCriteria eligibilityCriteria = _context.eligibilityCriteria.SingleOrDefault(c => c.Id == id);
                if (eligibilityCriteria == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "This Eligibility Criteria does not exist"
                        }
                    };
                    return StatusCode(404, resNull);
                }
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = eligibilityCriteria,
                        message = "Eligibility Criterias Retrieved Successfully"
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
        //POST:api/eligibilityCriteria
        [HttpPost]
        public IActionResult CreateEligibilityCriteria(EligibilityCriteria eligibility)
        {
            try
            {
                EligibilityCriteria checkinDb = _context.eligibilityCriteria.SingleOrDefault
                    (c => c.eligibilityCriteriaName == eligibility.eligibilityCriteriaName);
                if (checkinDb != null)
                {
                    var resAlreadyExists = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "This Eligibility Criteria already exists"
                        }

                    };
                    return StatusCode(400, resAlreadyExists);
                }
                EligibilityCriteria newEligibilityCriteria=new EligibilityCriteria
               {
                    eligibilityCriteriaName = eligibility.eligibilityCriteriaName
                };
                _context.eligibilityCriteria.Add(newEligibilityCriteria);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = newEligibilityCriteria,
                        message = "Eligibility Criteria Created Successfully"
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
        public IActionResult UpdateEligibilityCriteria(int id, [FromBody]EligibilityCriteria eligibility)
        {
            try
            {
                EligibilityCriteria checkInDb = _context.eligibilityCriteria.SingleOrDefault(c => c.Id == id);
                if (checkInDb == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "This Eligibility Criteiria does not exist"
                        }
                    };
                    return StatusCode(404, resNull);

                }
                checkInDb.eligibilityCriteriaName = eligibility.eligibilityCriteriaName;
                _context.eligibilityCriteria.Update(checkInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = "true",
                    payload = new
                    {
                        data = checkInDb,
                        message = "Eligibility Criteria Updated Successfully"
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
        public IActionResult DeleteEligibilityCriteria(int id)
        {
            try
            {
                EligibilityCriteria checkInDb = _context.eligibilityCriteria.SingleOrDefault(c => c.Id == id);
                if (checkInDb == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "This Eligibility Criteria does not exist"
                        }
                    };
                    return StatusCode(404, resNull);

                }

                _context.eligibilityCriteria.Remove(checkInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = "true",
                    payload = new
                    {

                        message = "Eligibility Criteria Deleted Successfully"
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