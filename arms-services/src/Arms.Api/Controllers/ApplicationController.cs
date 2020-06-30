using System;
using System.Linq;
using Arms.Api.Models;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Arms.Api.Controllers
{
    public class ApplicationController : BaseController
    {
        public readonly ArmsDbContext _context;
        
        public ApplicationController(ArmsDbContext context)
        {
            this._context = context;
        }

        [HttpGet("{id}")]
        public IActionResult Show(int id)
        {
            Response<Domain.Entities.Application> response;
            
            try
            {
                Arms.Domain.Entities.Application data = _context.Application.FirstOrDefault(application => application.Id == id);
                response = new Response<Domain.Entities.Application>(true, data, "Application retrieved successfully");
            }
            catch (Exception e)
            {
                response = new Response<Domain.Entities.Application>(false, null, "Something went wrong");

                return StatusCode(500, response);
            }
            
            return Ok(response);
        }
        
        [HttpGet("")]
        public IActionResult GetApplicationUsingJdIdAndCandidateId([FromQuery] int jdId, [FromQuery] int candidateId)
        {
            Response<Domain.Entities.Application> response;
            
            try
            {
                Arms.Domain.Entities.Application dataFromDb = _context.Application.Include(x => x.Job).Include(x => x.Candidate).FirstOrDefault(application => application.CandidateId == candidateId && application.JobId == jdId);
                dataFromDb.Resume = null;
                var resume = _context.Resume.FirstOrDefault(c => c.ApplicationId == dataFromDb.Id);
        
                var data = (dataFromDb != null
                    ? new
                    {
                        ApplicationId = dataFromDb.Id,
                        Candidate = new
                        {
                            Education = dataFromDb.Education,
                            Experience = dataFromDb.Experience,
                            Id = dataFromDb.Candidate.Id,
                            Name = dataFromDb.Candidate.Name,
                            Email = dataFromDb.Candidate.Email,
                            Phone = dataFromDb.Candidate.Phone,
                            Nationality = dataFromDb.Candidate.nationality,
                            Resume = resume.Cv
                        },
                        JobDescription = new
                        {
                            JobTitle = dataFromDb.Job.jobTitle,
                            Location = dataFromDb.Job.loc,
                            Id = dataFromDb.Job.Id,
                            Description = dataFromDb.Job.description,
                            Skills = dataFromDb.Job.skills
                        }
                    }
                    : null);

                return Ok(new
                {
                    success = true,
                    payload = new
                    {
                        data = data,
                        message = "Application Data Retrieved Successfully"
                    }
                });
            }
            catch (Exception e)
            {
                response = new Response<Domain.Entities.Application>(false, null, "Something went wrong");

                return StatusCode(500, response);
            }
        }
    }
}