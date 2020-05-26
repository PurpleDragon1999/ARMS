using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arms.Application.Services.Users;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]

    public class JobDescriptionController : BaseController
    {
        private readonly IIdentityService _identityService;
         ArmsDbContext _context;

        public JobDescriptionController(IIdentityService identityService,ArmsDbContext armsContext)
        {
            Console.WriteLine("debugging");
            _identityService = identityService;
            _context = armsContext;
        }
        //GET:/api/jobdescription
        [HttpGet]
        [Route("")]
       public IActionResult getJd()
        {
            List<JobDescription> jobDescriptions = _context.JobDescription.ToList();
            return Ok(jobDescriptions);
          

        }

    }
}