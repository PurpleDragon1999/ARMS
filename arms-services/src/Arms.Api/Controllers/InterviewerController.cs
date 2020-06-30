using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Arms.Domain.CustomEntities;
using Microsoft.AspNetCore.Mvc;
using Arms.Infrastructure;
using Arms.Domain.Entities;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Arms.Api.Controllers
{
    [Route("api/interviewer")]
    [ApiController]
    
    public class InterviewerController : ControllerBase
    {
        ArmsDbContext _context;
        public InterviewerController(ArmsDbContext armsDbContext)
        {
            _context = armsDbContext;
        }

        public string saveInterviewer(InterviewerModels interviewerModels)
        {
            try
            {
                for (int model = 0; model < interviewerModels.interviewerModels.Count; model++)
                {
                    for (int emp = 0; emp < interviewerModels.interviewerModels[model].EmployeesId.Count; emp++)
                    {
                        Interviewer interviewer = _context.Interviewer.SingleOrDefault(i => i.InterviewPanelId == interviewerModels.interviewerModels[model].PanelId && i.EmployeeId == interviewerModels.interviewerModels[model].EmployeesId[emp]);
                        if(interviewer == null)
                        {
                            Interviewer data = new Interviewer
                            {
                                EmployeeId = interviewerModels.interviewerModels[model].EmployeesId[emp],
                                InterviewPanelId = interviewerModels.interviewerModels[model].PanelId,
                                JobId = interviewerModels.interviewerModels[model].JobId
                            };
                            _context.Interviewer.Add(data);
                        }
                        
                    }
                }
                _context.SaveChanges();
                return "Success";
            }
            catch(DbUpdateException e){
                
                return e.Message;
            }
            
        }

        [HttpPut]
        [Authorize(Roles ="Admin")]
        public IActionResult updateInterviewer([FromBody]InterviewerModels interviewerModels)
        {
            Response response = new Response()
            {
                payload = new Payload()
            };
            try
            {
                string result = saveInterviewer(interviewerModels);
                if(result == "Success")
                {
                    response.success = "true";
                    response.payload.msg = "Records Updated Successfully";
                    
                    return StatusCode(200, response);
                }
                else
                {
                    response.success = "false";
                    response.payload.msg = "Some Error Occured. Details: " + result;
                    
                    return StatusCode(200, response);
                }
                
                
            }
            catch(DbUpdateException e)
            {
                response.success = "false";
                response.payload.msg = "Some Error Occured. Details: " + e.Message;
                
                return StatusCode(500, response);
            }

        }

        public string deleteByPanelID(int id)
        {
            try
            {
                List<Interviewer> interviewer = _context.Interviewer.Where(i => i.InterviewPanelId == id).ToList();
                if(interviewer.Count != 0)
                {
                    _context.Interviewer.RemoveRange(_context.Interviewer.Where(i => i.InterviewPanelId == id));
                    _context.SaveChanges();
                    return "Success";
                }
                else
                {
                    return "No Data Exists";
                }
            }
            catch(DbUpdateException e)
            {
                return e.Message;
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult delete(int id)
        {
            Response response = new Response()
            {
                payload = new Payload()
            };
            try
            {
                Interviewer interviewer = _context.Interviewer.SingleOrDefault(i => i.Id == id);
                if (interviewer != null)
                {
                    _context.Interviewer.Remove(interviewer);
                    _context.SaveChanges();
                    response.success = "true";
                    response.payload.msg = "Records Deleted Successfully";
                    
                    return StatusCode(500, response);
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

        public Panel getPanelMembers(int panelId)
        {
            try
            {
                List<Interviewer> interviewer = _context.Interviewer.Where(i => i.InterviewPanelId == panelId).ToList();
                Panel panel = new Panel()
                {
                    PanelId = panelId,
                    employeesId = new List<int>()
                };
                for (int i = 0; i < interviewer.Count; i++)
                {
                    panel.employeesId.Add(interviewer[i].EmployeeId);
                }
                return panel;
            }
            catch(SqlException e)
            {
                return null;
            }
            
        }
    }
}