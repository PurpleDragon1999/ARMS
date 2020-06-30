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
    public class RoundTypeController : BaseController
    {
        ArmsDbContext _context;
        public RoundTypeController(ArmsDbContext armsContext)
        {
            _context = armsContext;
        }
        //GET:api/roundType
        [HttpGet]
        public async Task<IActionResult> GetRoundTypes(int? pageNumber, int? pageSize)
        {
            try
            {
                var paginatedRoundList = from rt in _context.RoundType select rt;
                var paginatedList = await PaginatedList<RoundType>.CreateAsync(paginatedRoundList.AsNoTracking(), pageNumber ?? 1, pageSize ?? 5);
                
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = paginatedList,
                        message = "Round Types Retrieved Successfully"
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


        //GET:api/roundType/id
        [HttpGet("{id}")]
        [Authorize(Roles = "SuperAdministrator")]
        public IActionResult GetRoundType(int id)
        {
            RoundType round = _context.RoundType.SingleOrDefault(c => c.Id == id);
            try
            {
                if (round == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "No such round type exists"
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
                            data = round,
                            message = "Round Type Retrieved Successfully"
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

        //POST:api/roundType
        [HttpPost]
        [Authorize(Roles = "SuperAdministrator")]
        public IActionResult CreateRoundType(RoundType round)
        {
            try
            {
                TokenDecoder decodedToken = new TokenDecoder(Request);
                RoundType newround = new RoundType
                {
                    Name = round.Name,
                    CreatedBy=decodedToken.id,
                };
                _context.RoundType.Add(newround);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = newround,
                        message = "Round Type Created Successfully"
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
        //PUT:api/roundType/id
        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdministrator")]
        public IActionResult UpdateRoundType(int id, RoundType round)
        {
            try
            {
                TokenDecoder decodedToken = new TokenDecoder(Request);
                RoundType roundInDb = _context.RoundType.SingleOrDefault(c => c.Id == id);
                if (roundInDb == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {

                            message = "Round type does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }

                roundInDb.Name = round.Name;
                roundInDb.ModifiedBy = decodedToken.id;
                _context.RoundType.Update(roundInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        data = roundInDb,
                        message = "Round Type Updated Successfully"
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
        //DELETE:/api/roundType/id
        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdministrator")]
        public IActionResult DeleteRoundType(int id)
        {
            try
            {
                RoundType roundInDb = _context.RoundType.SingleOrDefault(c => c.Id == id);
                if (roundInDb == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {

                            message = "Such round type does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }
                _context.RoundType.Remove(roundInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        message = "Round type Deleted Successfully"
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
