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
        public IActionResult Getcandidates()
        {
            List<Candidate> candidates = _context.Candidate.Include(c => c.IdProofType).ToList();
            try
            {
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = candidates,
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
                        message = e.InnerException.Message
                    }
                };
                return StatusCode(500, response);
            }
        }

        [HttpGet("{id}")]

        public IActionResult GetCandidate(int id)
        {
            try
            {
                var candidate = _context.Candidate.Include(c => c.IdProofType).SingleOrDefault(c => c.Id == id);
                if (candidate != null)
                {
                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            data = candidate,
                            message = "Candidate Record Retrieved Successfully"
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
                            message = "Candidate Record with this ID does not exist"
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
                        message = e.InnerException.Message
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
                var candidate = _context.Candidate.SingleOrDefault(c => c.Id == id);
                if (candidate != null)
                {
                    _context.Candidate.Remove(candidate);
                    _context.SaveChanges();
                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            message = "Candidate Record Deleted Successfully"
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
                            message = "Candidate not found"
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
                        message = e.InnerException.Message
                    }
                };
                return StatusCode(500, response);
            }

        }

        public bool validateEmployee(CandidateApplicationResume candidateObj, int candidateId)
        {
            var lastAppliedOn = _context.Applications
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

                    var id = candidateObj.Id;

                    var applicationObj = new Applications
                    {
                        Education = customObj.Education,
                        Experience = customObj.Experience,
                        CandidateId = id,
                        ApplicationStatusTypeId = applicationStatus.Id,
                        JobId = customObj.JobId,
                        CreatedBy = customObj.CreatedBy,
                        ModifiedBy = customObj.ModifiedBy
                    };

                    var applicationId = applicationObj.Id;

                    var resumeObj = new Resume
                    {
                        Name = "CV|" + customObj.Name,
                        Cv = customObj.Cv,
                        ApplicationId = applicationId

                    };

                    _context.Resume.Add(resumeObj);
                    _context.Applications.Add(applicationObj);
                    _context.Candidate.Add(candidateObj);
                    _context.SaveChanges();

                }
                else
                {
                    var id = candidate.Id;
                    bool isAllowed = validateEmployee(customObj, id);

                    if (isAllowed)
                    {
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

                        var applicationObj = new Applications
                        {
                            Education = customObj.Education,
                            Experience = customObj.Experience,
                            CandidateId = id,
                            ApplicationStatusTypeId = applicationStatus.Id,
                            JobId = customObj.JobId,
                            CreatedBy = customObj.CreatedBy,
                            ModifiedBy = customObj.ModifiedBy
                        };

                        var applicationId = applicationObj.Id;

                        var resumeObj = new Resume
                        {
                            Name = "CV|" + customObj.Name,
                            Cv = customObj.Cv,
                            ApplicationId = applicationId

                        };

                        _context.Resume.Add(resumeObj);
                        _context.Applications.Add(applicationObj);
                        _context.SaveChanges();

                    }
                    else
                    {
                        var response2 = new
                        {
                            success = true,
                            payload = new
                            {
                                message = "Cannot register"
                            }
                        };
                        return StatusCode(200, response2);
                    }

                }

                //var applicationObj = new Applications
                //{
                //    Education = customObj.Education,
                //    Experience = customObj.Experience,
                //    CandidateId = id,
                //    ApplicationStatusTypeId = applicationStatus.Id,
                //    JobId = customObj.JobId,
                //    CreatedBy = customObj.CreatedBy,
                //    ModifiedBy = customObj.ModifiedBy
                //};

                //_context.Applications.Add(applicationObj);
                //_context.SaveChanges();

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
                        message = e.InnerException.Message
                    }
                };
                return StatusCode(500, response);

            }
                      
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateCandidateDetails(int id, [FromBody] CandidateApplicationResume customObj)
        {
            var resume = _context.Resume.SingleOrDefault(c => c.ApplicationId == id);
            var application = _context.Applications.SingleOrDefault(c => c.Id == id);
            var candidateId = application.CandidateId;
            var candidate = _context.Candidate.SingleOrDefault(c => c.Id == candidateId);
            try
            {
                if (candidate != null)
                {
                    if (customObj.Name != null)
                    {
                        candidate.Name = customObj.Name;
                    }
                    if (customObj.Email != null)
                    {
                        candidate.Email = customObj.Email;
                    }
                    if (customObj.Phone != null)
                    {
                        candidate.Phone = customObj.Phone;
                    }

                    if (customObj.Education != null)
                    {
                        application.Education = customObj.Education;
                    }

                    if (customObj.Experience != null)
                    {
                        application.Experience = customObj.Experience;
                    }

                    //if (customObj.ApplicationStatusTypeId != null)
                    //{
                    //    application.ApplicationStatusTypeId = customObj.ApplicationStatusTypeId;
                    //}

                    if (customObj.Cv != null)
                    {
                        resume.Cv = customObj.Cv ;
                    }

                    _context.Candidate.Update(candidate);
                    _context.Applications.Update(application);
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
                        message = e.InnerException.Message
                    }

                };
                //return StatusCode(500, response);
                throw e;
            }
        }

    }
}
