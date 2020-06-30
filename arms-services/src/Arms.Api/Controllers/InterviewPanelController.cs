using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Arms.Domain.Entities;
using Arms.Domain.CustomEntities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Arms.Api.Controllers
{
    [Route("api/panel")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class InterviewPanelController : ControllerBase
    {
        private readonly ArmsDbContext _context;
        private readonly InterviewerController _interviewerController;
        public InterviewPanelController(ArmsDbContext armsContext, InterviewerController interviewerController)
        {
            _context = armsContext;
            _interviewerController = interviewerController;
        }

        [HttpPost("{jobId}")]
        public IActionResult createPanel(int jobId, [FromBody] round rounds)
        {
            Response response = new Response()
            {
                payload = new Payload()
            };
            InterviewerModels interviewerModel = new InterviewerModels()
            {
                interviewerModels = new List<InterviewerModel>()
            };
            try
            {
                for (int r = 0; r < rounds.rounds.Count; r++)
                {
                    for (int p = 0; p < rounds.rounds[r].Panel.Count; p++)
                    {
                        InterviewPanel interviewPanel = new InterviewPanel()
                        {
                            RoundId = rounds.rounds[r].roundId
                            //Name = rounds.rounds[r].Panel[p].PanelName
                        };
                        _context.InterviewPanel.Add(interviewPanel);
                        _context.SaveChanges();
                        int newPanelId = interviewPanel.Id;

                        InterviewerModel temp = new InterviewerModel()
                        {
                            EmployeesId = rounds.rounds[r].Panel[p].employeesId,
                            PanelId = newPanelId,
                            JobId = jobId
                        };
                        interviewerModel.interviewerModels.Add(temp);
                    }
                }
                var result = _interviewerController.saveInterviewer(interviewerModel);
                if (result == "Success")
                {
                    response.success = "true";
                    response.payload.msg = "Records Created Successfully";

                    return StatusCode(200, response);
                }
                else
                {
                    response.success = "false";
                    response.payload.msg = "Some Error Occured. Details: " + result;

                    return StatusCode(500, response);
                }


            }
            catch (SqlException sqe)
            {
                response.success = "false";
                response.payload.msg = "Some Error Occured. Details: " + sqe.Message;

                return StatusCode(500, response);
            }

        }

        [HttpDelete("{id}")]
        public IActionResult deletePanel(int id)
        {
            Response response = new Response()
            {
                payload = new Payload()
            };
            try
            {
                InterviewPanel interviewPanel = _context.InterviewPanel.SingleOrDefault(p => p.Id == id);
                if (interviewPanel != null)
                {
                    string result = _interviewerController.deleteByPanelID(interviewPanel.Id);
                    if (result == "Success" || result == "No Data Exists")
                    {
                        _context.InterviewPanel.Remove(interviewPanel);
                        _context.SaveChanges();

                        response.success = "true";
                        response.payload.msg = "Records Deleted Successfully";

                        return StatusCode(200, response);
                    }
                    else
                    {
                        response.success = "false";
                        response.payload.msg = "Some Error Occured. Details: " + result;

                        return StatusCode(500, response);
                    }
                }
                else
                {
                    response.success = "false";
                    response.payload.msg = "Data Not Found";

                    return StatusCode(404, response);
                }
            }
            catch (SqlException e)
            {
                response.success = "false";
                response.payload.msg = "Some Error Occured. Details: " + e.Message;

                return StatusCode(500, response);
            }

        }


        //For getting all rounds related to an interview Id
        [HttpGet("round/{interviewId}")]
        public IActionResult getRounds(int interviewId)
        {
            Response response = new Response()
            {
                payload = new Payload()
            };
            try
            {
                var data = _context.Round.Where(r => r.InterviewId == interviewId).Select(r => new { r.Id, r.RoundDate, r.RoundTime }).ToList();
                if (data.Count != 0)
                {
                    response.success = "true";
                    response.payload.data = data;
                    return StatusCode(200, response);
                }
                else
                {
                    response.success = "false";
                    response.payload.msg = "No Data Found";
                    return StatusCode(404, response);
                }
            }
            catch (Exception e)
            {
                response.success = "false";
                response.payload.msg = "Some Error Occured. Details: " + e.Message;
                return StatusCode(500, response);
            }

        }

        [HttpPut("round")]
        public IActionResult updateRoundTime([FromBody] List<RoundTimeUpdate> roundTimeUpdate)
        {
            Response response = new Response()
            {
                payload = new Payload()
            };
            try
            {
                for (int i = 0; i < roundTimeUpdate.Count(); i++)
                {
                    Round round = _context.Round.SingleOrDefault(r => r.Id == roundTimeUpdate[i].RoundId);
                    round.RoundDate = roundTimeUpdate[i].RoundDate;
                    round.RoundTime = roundTimeUpdate[i].RoundTime;
                    _context.Round.Update(round);
                }
                _context.SaveChanges();
                response.success = "true";
                response.payload.msg = "Records Updated Successfully";
                return StatusCode(200, response);
            }
            catch (Exception e)
            {
                response.success = "false";
                response.payload.msg = "Some Error Occured. Details: " + e.Message;
                return StatusCode(500, response);

            }


        }

        [HttpGet("{id}")]
        public IActionResult getPanel(int id)
        {
            Response response = new Response()
            {
                payload = new Payload()
            };
            try
            {
                List<InterviewPanel> interview = _context.InterviewPanel.Where(p => p.RoundId == id).ToList();
                List<Panel> panels = new List<Panel>();
                if (interview.Count != 0)
                {
                    for (int p = 0; p < interview.Count; p++)
                    {
                        Panel m = _interviewerController.getPanelMembers(interview[p].Id);
                        if (m != null)
                        {
                            //m.PanelName = interview[p].PanelName
                            panels.Add(m);
                        }
                        else
                        {
                            response.success = "false";
                            response.payload.msg = "Data Not Found. Detail: Interviewer Record Not Found.";

                            return StatusCode(404, response);
                        }
                    }
                    response.success = "true";
                    response.payload.data = panels;

                    return StatusCode(200, response);
                }
                else
                {
                    response.success = "false";
                    response.payload.msg = "Data Not Found. Detail: Panel Not Found.";

                    return StatusCode(404, response);
                }
            }
            catch (SqlException e)
            {
                response.success = "false";
                response.payload.msg = "Some Error Occured. Details: " + e.Message;

                return StatusCode(200, response);
            }

        }
    }
}