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
        private readonly IIdentityService _identityService;
        ArmsDbContext _context;
        public MailHelperController mailHelper = new MailHelperController();
        public ResumeController(IIdentityService identityService, ArmsDbContext armsContext)
        {
            _identityService = identityService;
            _context = armsContext;
        }

        [HttpGet]
        public IActionResult GetResume()
        {
            List<Arms.Domain.Entities.Resume> resumes = _context.Resume.ToList();
            
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
                            data = resume.Cv,
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
