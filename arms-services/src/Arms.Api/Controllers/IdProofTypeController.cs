using Arms.Application.Services.Users;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace Arms.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class IdProofTypeController:BaseController
    {
       
        ArmsDbContext _context;
        public IdProofTypeController(ArmsDbContext armsContext)
        {
            _context = armsContext;
        }

        //GET:api/idProofType
        [HttpGet]
        public IActionResult GetIds()
        {
            List<IdProofType> idProofType = _context.IdProofType.ToList();
            try
            {
                var response = new
                {
                    success = "true",
                    payload = new
                    {
                        data = idProofType,
                        message = "IdProofs Retrieved Successfully"
                    }

                };
                return StatusCode(200, response);
            }
            catch (Exception e)
            {
                var response = new
                {
                    success = "false",
                    payload = new
                    {
                        data = idProofType,
                        message = e.Message
                    }

                };
                return StatusCode(500, response);
            }

        }


        [HttpGet("{id}")]
        public IActionResult GetId(int id)
        {
            var idDetails = _context.IdProofType.SingleOrDefault(c => c.Id == id);
            try
            {
                if (idDetails != null)
                {
                    var response = new
                    {
                        success = "true",
                        payload = new
                        {
                            data = idDetails,
                            message = "IdProof Record Retrieved Successfully"
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
                            message = "IdProof Record with this ID does not exist"
                        }

                    };
                    return StatusCode(404, response);
                }
            }
            catch (Exception e)
            {
                var response = new
                {
                    success = "false",
                    payload = new
                    {
                        message = e.Message
                    }

                };
                return StatusCode(500, response);
            }
        }

        [HttpPost]
        public IActionResult writeId(IdProofType id)
        {
            try
            {
                IdProofType checkinDb = _context.IdProofType.SingleOrDefault(c => c.Name == id.Name);
                if (checkinDb != null)
                {
                    var resAlreadyExists = new
                    {
                        success = "false",
                        payload = new
                        {
                            message = "Id type with this name already exists"
                        }

                    };
                    return StatusCode(400, resAlreadyExists);
                }
                IdProofType newIdentity = new IdProofType
                {

                    Name = id.Name,
                    CreatedBy = id.CreatedBy,
                    ModifiedBy = id.ModifiedBy,

                };
                _context.IdProofType.Add(newIdentity);
                _context.SaveChanges();
                var response = new
                {
                    success = "true",
                    payload = new
                    {
                        data = newIdentity,
                        message = "Id Proof detail  created Successfully"
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


        [HttpPatch("{id}")]
        public IActionResult UpdateId(int id, IdProofType idObj)
        {
            try
            {
                IdProofType idInDb = _context.IdProofType.SingleOrDefault(c => c.Id == id);
                if (idInDb == null)
                {
                    var resNull = new
                    {
                        success = "false",
                        payload = new
                        {

                            message = "This id does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }
                if (idObj.Name != null)
                {
                    idInDb.Name = idObj.Name;
                }
                if(idObj.CreatedBy != null)
                {
                    idInDb.CreatedBy = idObj.CreatedBy;
                }
                if (idObj.ModifiedBy != null)
                {
                    idInDb.ModifiedBy = idObj.ModifiedBy;
                }


                _context.IdProofType.Update(idInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = "true",
                    payload = new
                    {
                        data = idInDb,
                        message = "Id Updated Successfully"
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
                        message = ex.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteInterview(int id)
        {
            var idToDel = _context.IdProofType.SingleOrDefault(c => c.Id == id);
            try
            {
                if (idToDel != null)
                {
                    _context.IdProofType.Remove(idToDel);
                    _context.SaveChanges();
                    var response = new
                    {
                        success = "true",
                        payload = new
                        {
                            message = "Id Record Deleted Successfully"
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
                            message = "Id Proof Record with this ID does not exist"
                        }
                    };
                    return StatusCode(404, response);
                }
            }
            catch (Exception e)
            {
                var response = new
                {
                    success = "false",
                    payload = new
                    {
                        message = e.Message
                    }
                };
                return StatusCode(500, response);
            }
        }


    }
}
