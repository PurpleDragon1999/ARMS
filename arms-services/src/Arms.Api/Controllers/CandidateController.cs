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
                applications = _context.Application.Include(c => c.Candidate).Include(c => c.Job).Include(c => c.ApplicationStatus).Where(c => c.JobId == jobId).ToList();
            }
            else
            {
                applications = _context.Application.Include(c => c.Candidate).Include(c => c.Job).Include(c => c.ApplicationStatus).ToList();
            }


            try
            {
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = applications,
                        message = "Candidate Record Retrieved Successfully"
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
        public IActionResult GetApplication(int applicationId)
        {
            try
            {
                var application = _context.Application.Include(c=> c.Candidate).Include(c=> c.Job).Include(c=> c.ApplicationStatus).SingleOrDefault(c => c.Id == applicationId);
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
                            message = "Application Not found"
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
            var candidate = _context.Candidate.SingleOrDefault(c => c.Email == customObj.Email || c.IdentificationNo == customObj.IdentificationNo);
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
                            success = true,
                            payload = new
                            {
                                message = "Cannot Register"
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
                        message = "Registered successfully"
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
                        message = e.Message
                    }
                };
                return StatusCode(500, response);
            }
        }

        [HttpPut("{id}")]
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
                        message = e.Message
                    }

                };
                return StatusCode(500, response);      
            }
        }
    }
}
