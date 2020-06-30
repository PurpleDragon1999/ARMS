﻿using Microsoft.AspNetCore.Mvc;
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
using Microsoft.AspNetCore.Authorization;
using Arms.Api.Middlewares;

namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class CriteriaTypeController :BaseController
    {
        
        ArmsDbContext _context;
        public CriteriaTypeController( ArmsDbContext armsContext)
        {
          
            _context = armsContext;
        }
        //GET:api/CriteriaType
        [HttpGet]
        [Authorize(Roles ="SuperAdministrator,Admin")]
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
                    success = false,
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
        [Authorize(Roles = "SuperAdministrator")]
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
        [Authorize(Roles = "SuperAdministrator")]
        public IActionResult CreateCriteriaType(CriteriaType criteria)
        {
            try
            {
                TokenDecoder decodedToken = new TokenDecoder(Request);
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
                    roundTypeId = criteria.roundTypeId,
                    createdBy = decodedToken.id

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
        //PUT:api/ CriteriaType/id
        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdministrator")]
        public IActionResult UpdateCriteriaType(int id, CriteriaType criteria)
        {
            try
            {
                TokenDecoder decodedToken = new TokenDecoder(Request);
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
                criteriaType.modifiedBy = decodedToken.id;
                
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
        [Authorize(Roles = "SuperAdministrator")]
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
