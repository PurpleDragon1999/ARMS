using Arms.Application.Services.Users;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Arms.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeController : BaseController
    {
        public ArmsDbContext _context;
        public MailHelperController mailHelper = new MailHelperController();
        public ResumeController( ArmsDbContext armsContext)
        {
            _context = armsContext;
        }

        [HttpGet]
        public IActionResult GetResumes(int applicationId = 0)
        {
            List<Arms.Domain.Entities.Resume> resumes;
            if (applicationId == 0)
            {
                resumes = _context.Resume.ToList();
            }
            else
            {
                resumes = _context.Resume.Where(c => c.ApplicationId == applicationId).ToList();
            }
            
            try
            {
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = resumes,
                        message = "Resumes Retrieved Successfully"
                    }

                };
                return Ok(response);
            }
            catch (Exception e)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = e.Message
                    }
                };
                return StatusCode(500, response);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetResume(int id)
        {
            try
            {
                var resume = _context.Resume.FirstOrDefault(c => c.Id == id);
                if (resume != null)
                {
                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            data = resume ,
                            message = "Resume Retrieved Successfully"
                        }

                    };
                    return Ok(response);
                }
                else
                {
                    var response = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "Resume you are looking for does not exist"
                        }
                    };
                    return Ok(response);
                }
            }

            catch (Exception e)
            {
                var response = new
                {
                    success = false,
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
