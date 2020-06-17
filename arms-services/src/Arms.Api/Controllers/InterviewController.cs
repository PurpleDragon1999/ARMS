using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Arms.Application.Services.Users;
using Microsoft.AspNetCore.Http;
using Arms.Infrastructure;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Arms.Domain.CustomEntities;

namespace Arms.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InterviewController : ControllerBase
    {
        private readonly IIdentityService _identityService;
        ArmsDbContext _context;
        public InterviewController(IIdentityService identityService, ArmsDbContext armsContext)
        {
            _identityService = identityService;
            _context = armsContext;
        }


        [HttpGet]
        public IActionResult GetInterviews()
        {
            List<Interview> interviews = _context.Interview.Include(c => c.JobDescription).ToList();
            try
            {
                if (interviews != null)
                {
                    var response = new
                        {
                            success = true,
                            payload = new
                            {
                                data = interviews,
                                message = "Interview Records Retrieved Successfully"
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
                            message = "The Interview Records you are looking for do not exist"
                        }

                    };
                    return StatusCode(404, response);
                }
            }
            catch(Exception e)
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
        public IActionResult GetInterview(int id, int append=0)
        {
            var interview = _context.Interview.Include(c => c.JobDescription).SingleOrDefault(c => c.Id == id);
            try
            {
                if (interview != null)
                {
                    if (append == 0)
                    {
                        var response = new
                        {
                            success = true,
                            payload = new
                            {
                                data = interview,
                                message = "Interview Record Retrieved Successfully"
                            }

                        };
                        return StatusCode(200, response);
                    }
                    else
                    {
                        List<Round> rounds = _context.Round
                                                     .Include(c => c.Interview)
                                                     .Include(c => c.RoundType)
                                                     .Where(c => c.InterviewId == id)
                                                     .ToList();  
                        var response = new
                        {
                            success = true,
                            payload = new
                            {
                                data = rounds,
                                message = "Round Records Retrieved Successfully"
                            }

                        };
                        return StatusCode(200, response);
                                              
                    }

                }
                else
                {
                    var response = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "The Interview Record you are looking for does not exist"
                        }

                    };
                    return StatusCode(404,response);
                }
            }
            catch(Exception e)
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

        [HttpPost]
        public IActionResult CreateInterview([FromBody] CustomInterview customDTO)
        {
            try
            {
                var interviewObj = new Interview
                {
                    Date = customDTO.Date,
                    Time = customDTO.Time,
                    Venue = customDTO.Venue,
                    JobId = customDTO.JobId,
                    NoOfRounds = customDTO.NoOfRounds,
                    CreatedBy = customDTO.CreatedBy,
                    ModifiedBy = customDTO.ModifiedBy
                };
                _context.Interview.Add(interviewObj);
                _context.SaveChanges();
                int id = interviewObj.Id;

                foreach (Round round in customDTO.Round)
                {
                    var roundObj = round;
                    roundObj.InterviewId = id;
                    _context.Round.Add(roundObj);
                    _context.SaveChanges();
                }
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        message = "Interview Record Created Successfully"
                    }

                };
                return StatusCode(200, response);
            }
            catch(Exception e)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = e.InnerException
                    }

                };
                return StatusCode(500, response);
            }
        }


        [HttpPatch("{id}")]
        public IActionResult UpdateInterview(int id, [FromBody] CustomInterview customDTO, int roundID = 0)
        {
            var interview = _context.Interview.SingleOrDefault(c => c.Id == id);
            try
            {
                if (interview != null)
                {
                    if (roundID == 0)
                    {
                        if (customDTO.Date != System.DateTime.MinValue)
                        {
                            interview.Date = customDTO.Date;
                        }
                        if (customDTO.Time != System.TimeSpan.Zero)
                        {
                            interview.Time = customDTO.Time;
                        }
                        if (customDTO.Venue != null)
                        {
                            interview.Venue = customDTO.Venue;
                        }
                        if (customDTO.JobId != 0)
                        {
                            interview.JobId = customDTO.JobId;
                        }
                        if (customDTO.NoOfRounds != 0)
                        {
                            interview.NoOfRounds = customDTO.NoOfRounds;
                        }
                        _context.Interview.Update(interview);
                        _context.SaveChanges();
                        var response = new
                        {
                            success = true,
                            payload = new
                            {
                                message = "Interview Record Updated Successfully"
                            }
                        };
                        return StatusCode(200, response);
                    }
                    else
                    {
                        var round = _context.Round.SingleOrDefault(c => c.Id == roundID);
                        if (customDTO.Round[0].RoundNumber != 0)
                        {
                            round.RoundNumber = customDTO.Round[0].RoundNumber;
                        }
                        if (customDTO.Round[0].RoundTypeId != 0)
                        {
                            round.RoundTypeId = customDTO.Round[0].RoundTypeId;
                        }
                        if (customDTO.Round[0].RoundDate != System.DateTime.MinValue)
                        {
                            round.RoundDate = customDTO.Round[0].RoundDate;
                        }
                        if (customDTO.Round[0].RoundTime != System.TimeSpan.Zero)
                        {
                            round.RoundTime = customDTO.Round[0].RoundTime;
                        }
                        _context.Round.Update(round);
                        _context.SaveChanges();
                        var response = new
                        {
                            success = true,
                            payload = new
                            {
                                message = "Round Record Updated Successfully"
                            }
                        };
                        return StatusCode(200, response);
                    }
                }
                else
                {
                    var response = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "The Interview Record you are looking for does not exist"
                        }
                    };
                    return StatusCode(404,response);
                }
            }
            catch(Exception e)
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
        public IActionResult DeleteInterview(int id, int roundID = 0)
        {
            var interview = _context.Interview.SingleOrDefault(c => c.Id == id);
            try
            {
                if (interview != null)
                {
                    if (roundID == 0)
                    {
                        _context.Interview.Remove(interview);
                        _context.SaveChanges();
                        var response = new
                        {
                            success = true,
                            payload = new
                            {
                                message = "Interview record deleted successfully"
                            }
                        };
                        return StatusCode(200, response);
                    }
                    else
                    {
                        var round = _context.Round.SingleOrDefault(c => c.Id == roundID);
                        _context.Round.Remove(round);
                        _context.SaveChanges();
                        var response = new
                        {
                            success = true,
                            payload = new
                            {
                                message = "Round record deleted successfully"
                            }
                        };
                        return StatusCode(200, response);
                    }
                }
                else
                {
                    var response = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "The Interview Record you are looking for does not exist"
                        }
                    };
                    return StatusCode(404 , response);
                }
            }
            catch(Exception e)
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


    }
}