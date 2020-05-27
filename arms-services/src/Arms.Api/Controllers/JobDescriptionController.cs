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
        public JobDescriptionController(IIdentityService identityService, ArmsDbContext armsContext)
        {
            _identityService = identityService;
            _context = armsContext;
        }
        [HttpGet]
        public IActionResult GetJds()
        {
            List<JobDescription> jobDescriptions = _context.JobDescription.ToList();
            return Ok(jobDescriptions);
        }
        [HttpGet("{id}")]
        public IActionResult GetJd(int id)
        {
          JobDescription job=_context.JobDescription.SingleOrDefault(c => c.Id == id);
            if (job == null)
                return NotFound();
            return Ok(job);
        }
        [HttpPost]
        public IActionResult WriteJd(JobDescription job)
        {
            JobDescription newJob = new JobDescription
            {  
                openingDate=job.openingDate,
                closingDate=job.closingDate,
                locationId=job.locationId,
                description=job.description,
                jobTitle=job.jobTitle,
                vacancies=job.vacancies,
                salary=job.salary,


                

            };
            _context.JobDescription.Add(newJob);
            _context.SaveChanges();
            return Ok(newJob);

        }
        [HttpPut("{id}")]
        public IActionResult UpdateJd(int id,JobDescription job)
        {
            JobDescription jobInDb = _context.JobDescription.SingleOrDefault(c => c.Id == id);
            jobInDb.openingDate = job.openingDate;
            jobInDb.closingDate = job.closingDate;
            jobInDb.locationId = job.locationId;
            jobInDb.description = job.description;
            jobInDb.jobTitle = job.jobTitle;
            jobInDb.vacancies = job.vacancies;
            jobInDb.salary = job.salary;

            _context.JobDescription.Update(jobInDb);
            _context.SaveChanges();
            return Ok(jobInDb);
        }
        [HttpDelete("{id}")]
        public IActionResult UpdateJd(int id)
        {
            JobDescription jobInDb = _context.JobDescription.SingleOrDefault(c => c.Id == id);
         

            _context.JobDescription.Remove(jobInDb);
            _context.SaveChanges();
            return Ok("record deleted");
        }
    }
}