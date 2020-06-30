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
    
    public class EligibilityCriteriaController : BaseController
    {

        ArmsDbContext _context;
        public EligibilityCriteriaController( ArmsDbContext armsContext)
        {
           _context = armsContext;
        }
        //GET:api/eligibilityCriteria
        [HttpGet]
        [Authorize(Roles ="SuperAdministrator,Admin")]
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        //GET:api/eligibilityCriteira/id
        [HttpGet("{id}")]
        [Authorize(Roles = "SuperAdministrator")]
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        //POST:api/eligibilityCriteria
        [HttpPost]
        [Authorize(Roles = "SuperAdministrator")]
        public IActionResult CreateEligibilityCriteria(List<EligibilityCriteria> eligibility)
        {
            try
            { TokenDecoder decodedToken = new TokenDecoder(Request);
                for (int i = 0; i < eligibility.Count; i++)
                {
                    EligibilityCriteria checkinDb = _context.eligibilityCriteria.SingleOrDefault
                        (c => c.eligibilityCriteriaName == eligibility[i].eligibilityCriteriaName);
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
                    EligibilityCriteria newEligibilityCriteria = new EligibilityCriteria
                    {
                        eligibilityCriteriaName = eligibility[i].eligibilityCriteriaName,
                        createdBy = decodedToken.id,
                        modifiedBy = decodedToken.id
                    };
                    _context.eligibilityCriteria.Add(newEligibilityCriteria);
                    _context.SaveChanges();
                }
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = eligibility,
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }

        //PUT:api/employmentType/id
        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdministrator")]
        public IActionResult UpdateEligibilityCriteria(int id, [FromBody]EligibilityCriteria eligibility)
        {
            try
            {
                TokenDecoder decodedToken = new TokenDecoder(Request);
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
                checkInDb.eligibilityCriteriaName = eligibility.eligibilityCriteriaName;
                checkInDb.modifiedBy = decodedToken.id;
                _context.eligibilityCriteria.Update(checkInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdministrator")]
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
                    success = true,
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }


        }
    }
}