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

namespace Arms.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidateController : BaseController

    {
        private readonly IIdentityService _identityService;
        ArmsDbContext _context;
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
                    isValid = true,
                    message = "You cannot register before 6 months"
                };
                return res;
            }

            if (candidateObj.JobId == lastAppliedOn.ToArray()[0].JobId)
            {
                var res = new
                {
                    isValid = true,
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
                    candidate.Name = customObj.Name;
                    candidate.Email = customObj.Email;
                    candidate.Phone = customObj.Phone;
                    candidate.ModifiedBy = customObj.ModifiedBy;

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
        public IActionResult UpdateCandidateDetails(int id, [FromForm] CandidateApplicationResume customObj)
        {
            var resume = _context.Resume.SingleOrDefault(c => c.ApplicationId == id);
            var application = _context.Application.SingleOrDefault(c => c.Id == id);

            try
            {
                if (application != null)
                {  
                    var candidateId = application.CandidateId;
                    var candidate = _context.Candidate.SingleOrDefault(c => c.Id == candidateId);

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
                    candidate.nationality = customObj.nationality;
                    _context.SaveChanges();

                    application.Education = customObj.Education;
                    application.Experience = customObj.Experience;
                    application.ModifiedBy = customObj.ModifiedBy;
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
}
