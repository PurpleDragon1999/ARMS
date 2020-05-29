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
        //GET:api/jobDescriptions
        [HttpGet]
        public IActionResult GetJds()
        {
            try
            {
                List<JobDescription> jobDescriptions = _context.JobDescription.Include(l => l.location).ToList();
                var response = new
                {
                    success = "true",
                    payload = new
                    {
                        data = jobDescriptions,
                        message = "Job Descriptions Retrieved Successfully"
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
           
        }

     
        //GET:api/jobDescription/id
        [HttpGet("{id}")]
        
        public IActionResult GetJd(int id)
        {
          JobDescription job=_context.JobDescription.SingleOrDefault(c => c.Id == id);
            try
            {
                if (job == null)
                {
                    var resNull = new
                    {
                        success = "false",
                        payload = new
                        {
                            message = "This Jobdescription does not exist"
                        }
                    };
                    return StatusCode(404, resNull);
                }
                else
                {

                    var response = new
                    {
                        success = "true",
                        payload = new
                        {
                            data = job,
                            message = "Job Description Retrieved Successfully"
                        }
                       
                    };
                    return StatusCode(200,response);
                }
            }
            catch (Exception ex)
            {
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

        //POST:api/jobDescription
        [HttpPost]
        public IActionResult WriteJd(JobDescription job)
        {
            try
            {
                JobDescription checkinDb = _context.JobDescription.SingleOrDefault(c => c.jobTitle == job.jobTitle);
                if (checkinDb!=null)
                {
                    var resAlreadyExists = new
                    {
                        success = "false",
                        payload = new
                        {
                          message = "Job with this Job Title already exists"
                        }

                    };
                    return StatusCode(400, resAlreadyExists);
                }
                JobDescription newJob = new JobDescription
                {
                    openingDate = job.openingDate,
                    closingDate = job.closingDate,
                    locationId = job.locationId,
                    description = job.description,
                    jobTitle = job.jobTitle,
                    vacancies = job.vacancies,
                    salary = job.salary,
                    pdfBlobData = job.pdfBlobData
                };
                _context.JobDescription.Add(newJob);
                _context.SaveChanges();
                var response = new
                {   
                    success = "true",
                    payload = new
                    {
                        data = newJob,
                        message = "Job Description Created Successfully"
                    }

                };
                return StatusCode(201,response);
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
        //PUT:api/jobdescription/id
        [HttpPut("{id}")]
        public IActionResult UpdateJd(int id,JobDescription job)
        {
            try
            {
                JobDescription jobInDb = _context.JobDescription.SingleOrDefault(c => c.Id == id);
                if (jobInDb == null)
                {
                    var resNull = new
                    {
                        success = "false",
                        payload = new
                        {

                            message = "This Jobdescription does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }

                jobInDb.openingDate = job.openingDate;
                jobInDb.closingDate = job.closingDate;
                jobInDb.locationId = job.locationId;
                jobInDb.description = job.description;
                jobInDb.jobTitle = job.jobTitle;
                jobInDb.vacancies = job.vacancies;
                jobInDb.salary = job.salary;

                _context.JobDescription.Update(jobInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = "false",
                    payload = new
                    {
                        data = jobInDb,
                        message = "Job Description Updated Successfully"
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        //DELETE:/api/jobdescription/id
        [HttpDelete("{id}")]
        public IActionResult DeleteJd(int id)
        {
            try
            {
                JobDescription jobInDb = _context.JobDescription.SingleOrDefault(c => c.Id == id);
                if (jobInDb == null)
                {
                    var resNull = new
                    {
                        success = "false",
                        payload = new
                        {

                            message = "This Jobdescription does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }
                _context.JobDescription.Remove(jobInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = "true",
                    payload = new
                    {
                        message = "Job Description Deleted Successfully"
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
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
       
    }
}