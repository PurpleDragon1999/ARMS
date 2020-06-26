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
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;

namespace Arms.Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize(Roles ="Admin")]
	public class InterviewController : BaseController
	{   //mailController object 
		public MailHelperController mailHelper = new MailHelperController();
		//Email class Object
		public Email email = new Email();
		
		ArmsDbContext _context;
		public InterviewController( ArmsDbContext armsContext)
		{
			_context = armsContext;
		}


        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetInterviews(int employeeId=0,int jobId=0)
        {    if(employeeId!=0 && jobId != 0)
            {


                Round round =GetRound(employeeId, jobId);
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = round,
                        message = "Round Retrieved Successfully"
                    }

                };
                return StatusCode(200, response);


            }
            if (employeeId != 0)
            {
                List<Interview> interviewsListing = filterInterviews(employeeId);

                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = interviewsListing,
                        message = "Interview Records Retrieved Successfully"
                    }

                };
                return StatusCode(200, response);

            }

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
                List<Round> roundsList = new List<Round>();
				foreach (Round round in customDTO.Round)
				{
					var roundObj = round;
					roundObj.InterviewId = id;
					_context.Round.Add(roundObj);
                    _context.SaveChanges();
                  
                   
                }
                var roundToAdd = _context.Round.Include(c => c.RoundType).
                    Where(c => c.InterviewId == interviewObj.Id);
                var response = new
				{
					success = true,
					payload = new
					{

                        data=id,
						message = "Interview Record Created Successfully"

					}

				};

				//getting all the applications whose job Id in interview matches with id and whose status is Scheduled Interview
				var applications = _context.Application.Include(c => c.Candidate).
										   Where(c => c.JobId == interviewObj.JobId);
				//getting the job description object for sending in email
				JobDescription jdObject = _context.JobDescription.Include(l => l.employmentType).
															   Include(l => l.eligibilityCriteria).
															   Include(l => l.loc).
															  FirstOrDefault(c => c.Id == interviewObj.JobId);

				//Adding Emails in string Array to send to candidates

				foreach (Arms.Domain.Entities.Application app in applications)
				{
					string[] EmailToSend = new[]
					{
								app.Candidate.Email

					};
					string emailHtmlBody = email.GenerateEmailBody(jdObject, interviewObj, app);

					mailHelper.MailFunction(emailHtmlBody, EmailToSend);
				}
				return StatusCode(200, response);
			}
			catch(Exception e)
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
                        var rounds = _context.Round.Where(c=>c.InterviewId==id);
                        foreach (var round in rounds)
                        {
                           _context.Round.Remove(round);
                        }

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
       //function which returns round 
        public Round GetRound(int employeeId,int jobId)
        {
                 var interviewer = _context.Interviewer.FirstOrDefault(c => c.EmployeeId == employeeId && c.JobId == jobId);
                var panel = _context.InterviewPanel.FirstOrDefault(c => c.Id == interviewer.InterviewPanelId);
                Round round = _context.Round.Include(c => c.RoundType).FirstOrDefault(c => c.Id == panel.RoundId);
                return round;
           

      }
        //function which returns list of filtered interviews

        public List<Interview>filterInterviews(int employeeId)
        {
            var interviewer = _context.Interviewer.Where(c => c.EmployeeId == employeeId);

            List<Interview> interviewsListing = new List<Interview>();

            foreach (var inte in interviewer)
            {
                Interview interviewTo = _context.Interview.FirstOrDefault(c => c.JobId == inte.JobId);
                interviewsListing.Add(interviewTo);
            }

            return interviewsListing;
        }


        
      

    }
    //Email Class is made seperate to pass 3 different objects
    public class Email
    {
        public Email()
        {


        }
        public string GenerateEmailBody(JobDescription jdObject, Interview interview, Arms.Domain.Entities.Application app)
        {

            string output = @"<html>
		   <head>    
			  <style type=""text/css"">
			   </style>
		  </head>

		  <body aria-readonly=""false"" style=""cursor: auto;"">
			   <p>Dear Mr/Ms.</p><b>" + app.Candidate.Name + @"</b>We are pleased to inform you that you have 
		  successfully registered for an interview process with CyberGroup.The details of interview are.
			   </p>
		   <table>
			 <tr>
				<td><b>Date Of Interview:</b></td>
				<td>" + interview.Date.ToShortDateString() + @"</td>
			</tr>
			 <tr>
				<td><b>Time Of Interview:</b></td>
				<td>" + interview.Time + @"</td>
			</tr>
			  <tr>
				<td><b>Venue:</b></td>
				<td>" + interview.Venue + @"</td>
			</tr>
			<tr>
				<td><b>No Of Rounds:</b></td>
				<td>" + interview.NoOfRounds + @"</td>
			</tr>
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
     @"<a href = 'http://localhost:4200/progressTracker/" + app.Candidate.Code + "'>" + @"Please click here to track your progress</a>
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