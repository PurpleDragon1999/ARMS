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
using Arms.Domain.CustomEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System.Buffers.Text;
using Arms.Api.Middlewares;

namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    [Authorize(Roles ="Admin,SuperAdministrator")]
    public class JobDescriptionController : BaseController
    {

        ArmsDbContext _context;
      
        public MailHelperController mailHelper=new MailHelperController();
      
        public JobDescriptionController(ArmsDbContext armsContext)
        {   
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
                if (jobDescriptions != null)
                {
                  var response = new
                    {
                        success = true,
                        payload = new
                        {
                            data = jobDescriptions,
                            message = "Job Descriptions Retrieved Successfully"
                        }

                    };
                    return StatusCode(200, response);
                }
                else
                {
                    Response response = new Response()
                    {
                        payload = new Payload()
                    };
                    response.success = "true";
                    response.payload.msg = "No JD Found";
                    return StatusCode(200, response);
                }


            }
            catch (Exception ex)
            {
                var response = new
                {
                    success = false,
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
        [AllowAnonymous]
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
                        success = false,
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
                        success = true,
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
                    success = false,
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

                var decodedToken = new TokenDecoder(Request);
                if (checkinDb != null)
                {
                    var resAlreadyExists = new
                    {
                        success = false,
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
                    skills = job.skills,
                    pdfBlobData = job.pdfBlobData,
                    createdBy = decodedToken.id,
                    modifiedBy = decodedToken.id

                };
                _context.JobDescription.Add(newJob);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
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
                    success = false,
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
        public IActionResult UpdateJd(int id, [FromBody]CustomJob job)
        {
            try
            {
                var decodedToken = new TokenDecoder(Request);

                JobDescription jobInDb = _context.JobDescription.SingleOrDefault(c => c.Id == id);



                if (jobInDb == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {

                            message = "This Jobdescription does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }
                if (job.openingDate!= System.DateTime.MinValue)
                    jobInDb.openingDate = job.openingDate;

                if (job.closingDate != System.DateTime.MinValue)
                    jobInDb.closingDate = job.closingDate;

                if (job.locationId != 0)
                    jobInDb.locationId = job.locationId;

                if (job.eligibilityCriteriaId != 0)
                    jobInDb.eligibilityCriteriaId = job.eligibilityCriteriaId;

                if (job.employmentTypeId != 0)
                    jobInDb.employmentTypeId = job.employmentTypeId;



                if (job.description != null)
                    jobInDb.description = job.description;

                if (job.jobTitle != null)
                    jobInDb.jobTitle = job.jobTitle;

                if (job.skills != null)
                    jobInDb.skills = job.skills;

                if (job.vacancies != 0)
                    jobInDb.vacancies = job.vacancies;

                if (job.salary != null)
                    jobInDb.salary = job.salary;

                if (job.pdfString != null)
                {
                    string converted = job.pdfString.Replace('-', '+');
                    converted = converted.Replace('_', '/');
                    jobInDb.pdfBlobData = Convert.FromBase64String(job.pdfString);
                }
                else
                    jobInDb.modifiedBy = decodedToken.id;




                _context.JobDescription.Update(jobInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
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
                    success = false,
                    payload = new
                    {
                        message = "Something went wrong"
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
                        success = false,
                        payload = new
                        {

                            message = "This Jobdescription does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }
                var interviewId = _context.Interview.FirstOrDefault(c => c.JobId == id).Id;
                InterviewController controller=new InterviewController(_context);
                controller.DeleteInterview(interviewId); 
                 _context.JobDescription.Remove(jobInDb);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
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
                    success = false,
                    payload = new
                    {
                        message = "This job cannot be deleted"
                    }

                };
                return StatusCode(500, response);
            }
        }

        [HttpGet("search")]
        public  IActionResult searchJd(string keyword)
        {
            Response response = new Response()
            {
                payload = new Payload()
            };
            try
            {
               if (!String.IsNullOrEmpty(keyword))
                {
                   var searchedJds =  _context.JobDescription.Where(e => e.jobTitle.StartsWith(keyword)).ToList();


                    response.payload.data = searchedJds;
                    response.success = "true";
                    response.payload.msg = "Job Description searching done";
                    return StatusCode(200, response);
                }
                else
                {
                    var searchedJds = _context.JobDescription.ToList();
                    response.success = "true";
                    response.payload.data = searchedJds;
                    response.payload.msg = "All Job Descriptions retrieved";
                    return StatusCode(200, response);
                }

            }catch(Exception Ex)
            {
                response.success = "false";
                response.payload.msg = "Something Went Wrong";
                return StatusCode(500, response);
            }
        }

    }
    
}