using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Arms.Application.Services.Users;
using Microsoft.AspNetCore.Http;
using Arms.Infrastructure;
using Arms.Domain.Entities;

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
            List<Interview> interviews = _context.Interview.ToList();
            return Ok(interviews);
        }


        [HttpGet("{id}")]
        public IActionResult GetInterview(int id)
        {
            var interview = _context.Interview.SingleOrDefault(c => c.Id == id);
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

        [HttpPost]
        public IActionResult CreateInterview([FromBody] Interview interview)
        {
            var InterviewObj = interview;
            _context.Interview.Add(InterviewObj);
            _context.SaveChanges();
            return Ok(InterviewObj);
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




    }
}