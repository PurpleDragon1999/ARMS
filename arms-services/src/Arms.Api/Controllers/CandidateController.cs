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
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace Arms.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,SuperAdministrator,Employee")]
    public class CandidateController : BaseController
    {
        public ArmsDbContext _context;
        public MailHelperController mailHelper = new MailHelperController();
        public CandidateController(ArmsDbContext armsContext)
        {
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
        [AllowAnonymous]
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
                        success = false,
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
        public IActionResult DeleteApplication(int id)
        {
            try
            {
                var application = _context.Application.FirstOrDefault(c => c.Id == id);
                var resume = _context.Resume.FirstOrDefault(c => c.ApplicationId == id);
                if (application != null)
                {
                    _context.Resume.Remove(resume);
                    _context.SaveChanges();
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
        public  dynamic validateCandidate(CandidateApplicationResume candidateObj, int candidateId=0)
        {
            var candidateEmailValidate = _context.Candidate.FirstOrDefault(c => (c.Email == candidateObj.Email && c.Id != candidateId));

            if (candidateEmailValidate != null)
            {
                var res = new
                {
                    isValid = false,
                    message = "This Email is already registered."  
                };
                return res;
            }

            var candidatePhoneValidate = _context.Candidate.FirstOrDefault(c => (c.Phone == candidateObj.Phone && c.Id != candidateId));
            if (candidatePhoneValidate != null)
            {
                var res = new
                {
                    isValid = false,
                    message = "This Phone Number is already registered."
                };
                return res;
            }
            var candidate = _context.Candidate.FirstOrDefault(c => c.IdentificationNo == candidateObj.IdentificationNo);
            if (candidate == null)
            {
                var res = new
                {
                    isValid = true
                };
                return res;
            }
            var lastAppliedOn = _context.Application
                .Where(c => c.CandidateId == candidateId)
                .GroupBy(c => c.JobId )
                .Select(g => g.OrderByDescending(c => c.DateOfApplication).First())
                .Select(c => new {c.Id, c.DateOfApplication, c.JobId });

            var applicationId = lastAppliedOn.ToArray()[0].Id;
      
            TimeSpan value = (DateTime.Now).Subtract(lastAppliedOn.ToArray()[0].DateOfApplication);

            if (value.TotalDays > 183)
            {
                var res = new
                {
                    isValid = true
                };
                return res;
            }

            var assessment = _context.Assessment.SingleOrDefault(c => c.ApplicationId == applicationId);
            if (assessment != null)
            {
                var res = new
                {
                    isValid = false,
                    message = "You cannot register before 6 months"
                };
                return res;
            }

            if (candidateObj.JobId == lastAppliedOn.ToArray()[0].JobId)
            {
                var res = new
                {
                    isValid = false,
                    message = "You've already registered for this Job Position"
                };
                return res;
            }
            var resAllowed = new
            {
                isValid = true
            };
            return resAllowed;

        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult CreateCandidate([FromForm] CandidateApplicationResume customObj)
        {
            var candidate = _context.Candidate.FirstOrDefault(c=> c.IdentificationNo == customObj.IdentificationNo);
            var applicationStatus = _context.ApplicationStatusType.SingleOrDefault(c => c.StatusName == "AppliedSuccessfully");

            try

            {
                int id = 0;
                if (candidate != null)
                {
                    id = candidate.Id;
                }
                var result = validateCandidate(customObj, id);

                if (!result.isValid)
                {
                    var responseFalse = new
                    {
                        success = false,
                        payload = new
                        {
                            message = result.message
                        }
                    };
                    return StatusCode(200, responseFalse);
                }

                //Candidate candidateObj = new Candidate();
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
                    candidate.nationality = customObj.nationality;
                    candidate.Name = customObj.Name;
                    candidate.Email = customObj.Email;
                    candidate.Phone = customObj.Phone;
                    candidate.ModifiedBy = customObj.ModifiedBy;

                    _context.Candidate.Update(candidate);
                    _context.SaveChanges();
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

                //Getting FileName
                var fileName = Path.GetFileName(customObj.Cv.FileName);
                //Getting file Extension
                var fileExtension = Path.GetExtension(fileName);
                // concatenating  FileName + FileExtension
                var newFileName = String.Concat(Convert.ToString(Guid.NewGuid()), fileExtension);

                var resumeObj = new Resume
                {
                    Name = newFileName,
                    ApplicationId = applicationId,
                    CreatedBy = customObj.CreatedBy,
                    ModifiedBy = customObj.ModifiedBy
                };

                using (var target = new MemoryStream())
                {
                    customObj.Cv.CopyTo(target);
                    resumeObj.Cv = target.ToArray();
                }

                _context.Resume.Add(resumeObj);
                _context.SaveChanges();
                
                var response = new
                {
                    success = true,
                    payload = new
                    {       
                        message = "Registered Successfully"
                    }
                };

                //JobDescription jdObject = _context.JobDescription.Include(l => l.employmentType).
                //    Include(l => l.eligibilityCriteria).Include(l => l.loc).
                //    FirstOrDefault(c => c.Id == applicationObj.JobId);
                //string emailHtmlBody = GenerateEmailBody( jdObject, candObj.Code,candObj.Name);
                ////Adding Emails in string Array to send to candidates
                //string[] EmailToSend = new[]
                //{
                //    candObj.Email
                //};

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
        [AllowAnonymous]
        public IActionResult UpdateCandidateDetails(int id, [FromForm] CandidateApplicationResume customObj)

        {
            var application = _context.Application.SingleOrDefault(c => c.Id == id);

            try
            {
                if (application != null)
                {  
                    var candidateId = application.CandidateId;
                    var candidate = _context.Candidate.SingleOrDefault(c => c.Id == candidateId);
                    var resume = _context.Resume.FirstOrDefault(c => c.ApplicationId == id);

                    if (customObj.nationality != candidate.nationality || customObj.IdProofTypeId != candidate.IdProofTypeId ||customObj.IdentificationNo != candidate.IdentificationNo)
                    {
                        var responseFalse = new
                        {
                            success = false,
                            payload = new
                            {
                                message = "You cannot Change Identification type or Identification Number"
                            }
                        };
                        return StatusCode(200, responseFalse);
                    }

                    var result = validateCandidate(customObj, candidateId);
                    if (!result.isValid)
                    {
                        var responseFalse = new
                        {
                            success = false,
                            payload = new
                            {
                                message = result.message
                            }
                        };
                        return StatusCode(200, responseFalse);
                    }

                    candidate.Name = customObj.Name;
                    candidate.Email = customObj.Email;
                    candidate.Phone = customObj.Phone;
                    candidate.ModifiedBy = customObj.ModifiedBy;
                    _context.Candidate.Update(candidate);
                    _context.SaveChanges();

                    var modifiedApplication = _context.Application.FirstOrDefault(c => c.Id == id);
                    
                    modifiedApplication.Education = customObj.Education;
                    modifiedApplication.Experience = customObj.Experience;
                    modifiedApplication.ModifiedBy = customObj.ModifiedBy;
                    _context.Application.Update(modifiedApplication);
                    _context.SaveChanges();

                    //Getting FileName
                    var fileName = Path.GetFileName(customObj.Cv.FileName);
                    //Getting file Extension
                    var fileExtension = Path.GetExtension(fileName);
                    // concatenating  FileName + FileExtension
                    var newFileName = String.Concat(Convert.ToString(Guid.NewGuid()), fileExtension);

                    resume.Name = fileName;
                    resume.ModifiedBy = customObj.ModifiedBy;

                    using (var target = new MemoryStream())
                    {
                        customObj.Cv.CopyTo(target);
                        resume.Cv = target.ToArray();
                    }

                    _context.Resume.Update(resume);
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
        public string GenerateEmailBody(JobDescription jdObject, string Code,String Name)
        {

            string output = @"<html>
       <head>    
	       <style type=""text/css"">
           </style>
       </head>

         <body aria-readonly=""false"" style=""cursor: auto;"">
               <p>Dear Mr/Ms.</p><b>" + Name + @"</b>We are pleased to inform you that you have 
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
    </table>" +
     @"<a href = 'http://localhost:4200/progressTracker/" + Code + "'>" + @"Please click here to track your progress</a>
      <br>
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
