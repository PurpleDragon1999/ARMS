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

namespace Arms.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InterviewController : BaseController
    {
        private readonly IIdentityService _identityService;
        ArmsDbContext _context;
        public InterviewController(IIdentityService identityService, ArmsDbContext armsContext)
        {
            _identityService = identityService;
            _context = armsContext;
        }


        [HttpGet]
        public IActionResult GetInterviews()
        {
            List<Interview> interviews = _context.Interview.Include(c => c.JobDescription).ToList();
            try
            {
                var response = new
                {
                    success = "true",
                    payload = new
                    {
                        data = interviews,
                        message = "Interview Record Retrieved Successfully"
                    }

                };
                return StatusCode(200, response);
            }
            catch(Exception e)
            {
                return StatusCode(400, e.Message);
            }
        }


        [HttpGet("{id}")]
        public IActionResult GetInterview(int id)
        {
            var interview = _context.Interview.Include(c => c.JobDescription).SingleOrDefault(c => c.Id == id);
            try
            {
                if (interview != null)
                {
                    var response = new
                    {
                        success = "true",
                        payload = new
                        {
                            data = interview,
                            message = "Interview Record Retrieved Successfully"
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
                            message = "Interview Record with this ID does not exist"
                        }

                    };
                    return StatusCode(404,response);
                }
            }
            catch(Exception e)
            {
                return StatusCode(400, e.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateInterview([FromBody] CustomInterview customDTO)
        {
            var interviewObj = new Interview
            {
                Date = customDTO.Date,
                Time = customDTO.Time,
                Venue = customDTO.Venue,
                JobId = customDTO.JobId,
                NoOfRounds =customDTO.NoOfRounds,
                CreatedAt = customDTO.CreatedAt,
                CreatedBy = customDTO.CreatedBy,
                ModifiedAt = customDTO.ModifiedAt,
                ModifiedBy = customDTO.ModifiedBy
            };
            
            foreach (Round round in customDTO.Round)
            {
                var roundObj = round;
                _context.Round.Add(roundObj);

            }
            _context.Interview.Add(interviewObj);
            _context.SaveChanges();
            return Ok("created");
        }


        [HttpPatch("{id}")]
        public IActionResult UpdateInterview(int id, [FromBody] Interview interviewObj)
        {
            var interview = _context.Interview.SingleOrDefault(c => c.Id == id);
            if (interview != null)
            {
                _context.Interview.Update(interviewObj);
                _context.SaveChanges();
                var response = new
                {
                    success = "true",
                    payload = new
                    {
                        data = interviewObj,
                        message = "Interview Record Updated Successfully"
                    }
                };
                return Ok(response);
            }
            else
            {
                var response = new
                {
                    success = "true",
                    payload = new
                    {
                        message = "Interview Record with this ID does not exist"
                    }
                };
                return Ok(response);
            }
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteInterview(int id)
        {
            var interview = _context.Interview.SingleOrDefault(c => c.Id == id);
            try
            {
                if (interview != null)
                {
                    _context.Interview.Remove(interview);
                    _context.SaveChanges();
                    var response = new
                    {
                        success = "true",
                        payload = new
                        {
                            message = "Interview Record Deleted Successfully"
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
                            message = "Interview Record with this ID does not exist"
                        }
                    };
                    return StatusCode(404 , response);
                }
            }
            catch(Exception e)
            {
                return StatusCode(400, e.Message);
            }
        }


    }
}