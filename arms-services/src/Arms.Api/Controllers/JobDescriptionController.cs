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
using System.Net.Mail;

namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobDescriptionController : BaseController
    {
        private readonly IIdentityService _identityService;
        ArmsDbContext _context;
        public MailHelperController mailHelper=new MailHelperController();
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
                List<JobDescription> jobDescriptions = _context.JobDescription.Include(l => l.employmentType).
                    Include(l => l.eligibilityCriteria).Include(l => l.loc).ToList();
                var response = new
                {
                    success = "true",
                    payload = new
                    {
                        data = jobDescriptions,
                        message = "Job Descriptions Retrieved Successfully"
                    }

                };
                string emailHtmlBody = GenerateEmailBody();
               // mailHelper.MailFunction(emailHtmlBody);
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


        //GET:api/jobDescription/id
        [HttpGet("{id}")]

        public IActionResult GetJd(int id)
        {

            try
            {
                JobDescription job = _context.JobDescription.Include(l => l.employmentType).
                    Include(l => l.eligibilityCriteria).Include(l => l.loc).
                    SingleOrDefault(c => c.Id == id);



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
                    return StatusCode(200, response);
                }
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

        //POST:api/jobDescription
        [HttpPost]
        public IActionResult WriteJd(JobDescription job)
        {
            try
            {
                JobDescription checkinDb = _context.JobDescription.SingleOrDefault(c => c.jobTitle == job.jobTitle);
                if (checkinDb != null)
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
                    employmentTypeId = job.employmentTypeId,
                    eligibilityCriteriaId = job.eligibilityCriteriaId,
                    description = job.description,
                    jobTitle = job.jobTitle,
                    vacancies = job.vacancies,
                    salary = job.salary,
                    skills=job.skills,
                    pdfBlobData = job.pdfBlobData,

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
                
                return StatusCode(201, response);
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
        //PUT:api/jobdescription/id
        [HttpPut("{id}")]
        public IActionResult UpdateJd(int id, [FromBody]JobDescription job)
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
                if (job.openingDate != null)
                    jobInDb.openingDate = job.openingDate;

                if (job.closingDate != null)
                    jobInDb.closingDate = job.closingDate;

                if (job.locationId != 0)
                    jobInDb.locationId = job.locationId;

                if (job.description != null)
                    jobInDb.description = job.description;

                if (job.jobTitle != null)
                    jobInDb.jobTitle = job.jobTitle;

                if (job.skills != null)
                    jobInDb.skills = job.skills;

                if (job.vacancies != 0)
                    jobInDb.vacancies = job.vacancies;

                if (job.salary != 0)
                    jobInDb.salary = job.salary;

                _context.JobDescription.Update(jobInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = "true",
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
                        message = ex.InnerException.Message
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
                        message = ex.InnerException.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
        public string GenerateEmailBody()
        {
            string output = @"<html>
       <head>    
	       <style type=""text/css"">
           </style>
       </head>

         <body aria-readonly=""false"" style=""cursor: auto;"">
              <p> Hello </p>
             <p> Thank You for expressing your Interest for the position of ${ jdObject.jdTitle}
              ,You can read more about us on our company career page </p>
             <a href = 'www.cygrp.com/careers' > www.cygrp.com / careers </a>
             <p  Please signup if you wish to accept and proceed with our process</p>
             <a href = 'http://localhost:4200/candidateForm/${jdObject.jdId}' > Click here to apply.</a>
             <p> Regards,</p>
             <p> HR,</p>
             <p> Cybergroup,B - 9, Block B, Sector 3, Noida, Uttar Pradesh 201301 </p>
             <p> Thanks </p>
            <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCUuWWhu0HByWgdDAp2cA1TDf-a_
                   FpjUA_DFbRt33DViY9tNDH & usqp = CAU'width='150'height='150'>
             <br>
            <em >This is automatically generated email,please do not reply</em>
         </body>
     </html>
            ";
            return output;
        }



    }
}