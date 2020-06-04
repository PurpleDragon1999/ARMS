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

namespace Arms.Api.Controllers
{
    [Route("api/panel")]
    [ApiController]
    public class InterviewPanelController : ControllerBase
    {
        private readonly ArmsDbContext _context;
        private readonly InterviewerController _interviewerController;
        public InterviewPanelController(ArmsDbContext armsContext, InterviewerController interviewerController)
        {
            _context = armsContext;
            _interviewerController = interviewerController;
        }

        [HttpPost]
        public IActionResult createPanel([FromBody] round rounds)
        {
            Response response = new Response()
            {
                payload = new Payload()
            };
            List<InterviewerModel> interviewerModel = new List<InterviewerModel>();
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
                            PanelId = newPanelId
                        };
                        interviewerModel.Add(temp);
                    }
                }
                var result = _interviewerController.saveInterviewer(interviewerModel);
                if(result == "Success")
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
            catch(SqlException sqe)
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
            catch(SqlException e)
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
                if(interview.Count != 0)
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
            catch(SqlException e)
            {
                response.success = "false";
                response.payload.msg = "Some Error Occured. Details: " + e.Message;
                
                return StatusCode(200, response);
            }
            
        }
    }
}