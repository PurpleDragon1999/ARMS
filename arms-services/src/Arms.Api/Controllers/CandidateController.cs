using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arms.Application.Services.Users;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Arms.Domain.CustomEntities;

namespace Arms.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidateController : BaseController

    {
        private readonly IIdentityService _identityService;
        ArmsDbContext _context;
        public Email email = new Email();
        public MailHelperController mailHelper = new MailHelperController();
        public CandidateController(IIdentityService identityService, ArmsDbContext armsContext)
        {
            _identityService = identityService;
            _context = armsContext;
        }

        [HttpGet]
        public IActionResult Getcandidates(int jobId = 0)
        {
            List<Arms.Domain.Entities.Application> applications;
            if (jobId != 0)
            {
                applications = _context.Application.Include(c => c.Candidate).Include(c => c.ApplicationStatusType).Include(c=> c.Job).Where(c => c.JobId == jobId).ToList();
            }
            else
            {
                applications = _context.Application.Include(c => c.Candidate).Include(c => c.ApplicationStatusType).Include(c => c.Job).ToList();
            }


            try
            {
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = applications,
                        message = "Applications Retrieved Successfully"
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
        public IActionResult GetApplication(int id )
        {
            try
            {
                var application = _context.Application.Include(c=> c.Candidate).Include(c=> c.ApplicationStatusType).Include(c=> c.Job).SingleOrDefault(c => c.Id == id);
                if (application != null)
                {
                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            data = application,
                            message = "Application Retrieved Successfully"
                        }

                    };
                    return Ok(response);
                }
                else
                {
                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            message = "Application you are looking for does not exist"
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

        [HttpDelete("{id}")]
        public IActionResult DeleteInterview(int id)
        {
            try
            {
                var application = _context.Application.SingleOrDefault(c => c.Id == id);
                if (application != null)
                {
                    _context.Application.Remove(application);
                    _context.SaveChanges();
                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            message = "Application Deleted Successfully"
                        }
                    };
                    return Ok(response);
                }
                else
                {
                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            message = "Application Not Found"
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
        public bool validateCandidate(CandidateApplicationResume candidateObj, int candidateId)
        {
            var lastAppliedOn = _context.Application
                .Where(c => c.CandidateId == candidateId)
                .GroupBy(c => c.JobId )
                .Select(g => g.OrderByDescending(c => c.DateOfApplication).First())
                .Select(c => new {c.Id, c.DateOfApplication, c.JobId });

            var applicationId = lastAppliedOn.ToArray()[0].Id;
      
            TimeSpan value = (DateTime.Now).Subtract(lastAppliedOn.ToArray()[0].DateOfApplication);

            if (value.TotalDays > 183)
            {
                return true;
            }

            var assessment = _context.Assessment.SingleOrDefault(c => c.ApplicationId == applicationId);
            if (assessment != null)
            {
                return false;
            }

            if (candidateObj.JobId == lastAppliedOn.ToArray()[0].JobId)
            {
                return false;
            }
            return true;
            
        }

        [HttpPost]
        public IActionResult CreateCandidate([FromBody] CandidateApplicationResume customObj)
        {
            var candidate = _context.Candidate.FirstOrDefault(c => c.Email == customObj.Email || c.IdentificationNo == customObj.IdentificationNo || c.Phone == customObj.Phone);
            var applicationStatus = _context.ApplicationStatusType.SingleOrDefault(c => c.StatusName == "AppliedSuccessfully");
            try
            {
                int id;
                if (candidate == null)
                {       
                    var candidateObj = new Candidate
                    {
                        Name = customObj.Name,
                        Email = customObj.Email,
                        Phone = customObj.Phone,
                        IdProofTypeId = customObj.IdProofTypeId,
                        IdentificationNo = customObj.IdentificationNo,
                        nationality = customObj.nationality,
                        CreatedBy = customObj.CreatedBy,
                        ModifiedBy = customObj.ModifiedBy
                        
                       
                    };
                    _context.Candidate.Add(candidateObj);
                    _context.SaveChanges();
                    id = candidateObj.Id;
                }
                else
                {
                    id = candidate.Id;
                    bool isAllowed = validateCandidate(customObj, id);
                
                    if (isAllowed)
                    {
                        id = candidate.Id;
                        if (customObj.Name != null)
                        {
                            candidate.Name = customObj.Name;
                            candidate.ModifiedBy = customObj.ModifiedBy;
                        }
                        if (customObj.Email != null)
                        {
                            candidate.Email = customObj.Email;
                            candidate.ModifiedBy = customObj.ModifiedBy;
                        }
                        if (customObj.Phone != null)
                        {
                            candidate.Phone = customObj.Phone;
                            candidate.ModifiedBy = customObj.ModifiedBy;
                        }
                        _context.SaveChanges();
                    }
                    else
                    {
                        var responseFalse = new
                        {
                            success = false,
                            payload = new
                            {
                                message = "You Cannot Register"
                            }
                        };
                        return StatusCode(200, responseFalse);
                    }
                }

                var applicationObj = new Domain.Entities.Application
                {
                    Education = customObj.Education,
                    Experience = customObj.Experience,
                    CandidateId = id,
                    ApplicationStatusTypeId = applicationStatus.Id,
                    JobId = customObj.JobId,
                    CreatedBy = customObj.CreatedBy,
                    ModifiedBy = customObj.ModifiedBy
                };

                _context.Application.Add(applicationObj);
                _context.SaveChanges();
                int applicationId = applicationObj.Id;
              
                var response = new
                {
                    success = true,
                    payload = new
                    {       
                        message = "Registered Successfully"
                    }
                };
                JobDescription jdObject = _context.JobDescription.SingleOrDefault(c => c.Id == applicationObj.JobId);
                string emailHtmlBody = email.GenerateEmailBody( jdObject,candidate);
                //Adding Emails in string Array to send to candidates
                string[] EmailToSend = new[]
                {
                    candidate.Email
                };

                mailHelper.MailFunction(emailHtmlBody, EmailToSend);
                return StatusCode(200, response);
            }
            catch (Exception e)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = e
                    }
                };
                return StatusCode(500, response);
            }
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateCandidateDetails(int id, [FromBody] CandidateApplicationResume customObj)
        {
            var resume = _context.Resume.SingleOrDefault(c => c.ApplicationId == id);
            var application = _context.Application.SingleOrDefault(c => c.Id == id);
            
            try
            {
                if (application != null)
                {
                    var candidateId = application.CandidateId;
                    var candidate = _context.Candidate.SingleOrDefault(c => c.Id == candidateId);

                    if (customObj.Name != null)
                    {         
                        candidate.Name = customObj.Name;
                        candidate.ModifiedBy = customObj.ModifiedBy;
                    }

                    if (customObj.Email != null)
                    { 
                        candidate.Email = customObj.Email;
                        candidate.ModifiedBy = customObj.ModifiedBy;
                    }

                    if (customObj.Phone != null)
                    { 
                        candidate.Phone = customObj.Phone;
                        candidate.ModifiedBy = customObj.ModifiedBy;
                    }

                    if (customObj.Education != null)
                    {  
                        application.Education = customObj.Education;
                        application.ModifiedBy = customObj.ModifiedBy;
                    }

                    if (customObj.Experience != null)
                    { 
                        application.Experience = customObj.Experience;
                        application.ModifiedBy = customObj.ModifiedBy;
                    }
                    
                    //if (customObj.Cv != null)
                    //{
                    //    resume.Cv = customObj.Cv ;
                    //}
                    
                    _context.Candidate.Update(candidate);
                    _context.SaveChanges();

                    _context.Application.Update(application);
                    _context.SaveChanges();

                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            message = "Candidate Details Updated Successfully"
                        }
                    };
                    return StatusCode(200, response);
                }
                else
                {
                    var response = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "The Candidate Record you are looking for does not exist"
                        }
                    };
                    return StatusCode(404, response);
                }
            }
            catch (Exception e)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = e
                    }
                };
                return StatusCode(500, response);      
            }

       }
      
    }
    public  class Email
    {
        public Email()
        {


        }
        public string GenerateEmailBody(JobDescription jdObject, Candidate candidate)
        {

            string output = @"<html>
       <head>    
	       <style type=""text/css"">
           </style>
       </head>

         <body aria-readonly=""false"" style=""cursor: auto;"">
               <p>Dear Mr/Ms.</p><b>" + candidate.Name + @"</b>We are pleased to inform you that you have 
    successfully registered for an interview process with CyberGroup.The details of interview will be communicated soon.
    </p>
    <table>
       <tr>
         <td><b>Job ID:</b></td>
         <td>" + jdObject.code + @"</td>
       </tr>
       <tr>
       <td><b>Job Title:</b></td>
       <td>" + jdObject.jobTitle + @"</td>
     </tr>
       <tr>
         <td><b>Job Type:</b></td>
         <td>" + jdObject.employmentType.employmentTypeName + @"</td>
       </tr>
        <tr>
       <td ><b>Address:</b></td>
       <td> B-9, Block B, Sector 3, Noida, Uttar Pradesh 201301</td>
     </tr>
    </table>+" +
     @"<a href = 'http://localhost:4200/progressTracker/" + candidate.Code + "'>" + @"Please click here to track your progress</a>
      < br >
    <em>This is automatically generated email,please do not reply</em>
    <p>Thanks</p>
     <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCUuWWhu0HByWgdDAp2cA1TDf-a_
 
      FpjUA_DFbRt33DViY9tNDH&usqp= CAU'width='100'height='100'>
         </body>
     </html>
            ";
            Console.WriteLine(output);
            return output;
        }




    }
}
