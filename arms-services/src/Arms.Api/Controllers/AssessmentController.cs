using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Arms.Api.Models;
using Arms.Application.Services.Users;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Hrms.Core;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    public class AssessmentController : BaseController
    {
        private readonly ArmsDbContext _context;
        
        public AssessmentController(ArmsDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            Response<IEnumerable<Assessment>> response;
            
            try
            {
                List<Assessment> data = _context.Assessment.ToList();
                response = new Response<IEnumerable<Assessment>>(true, data, "Assessments retrieved successfully");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                response = new Response<IEnumerable<Assessment>>(false, null, "Something went wrong");

                return StatusCode(500, response);
            }
            return Ok(response);
        }
        
        [HttpGet("{id}")]
        public IActionResult Show(int id)
        {
            Response<Assessment> response;
            
            try
            {
                Assessment data = _context.Assessment.FirstOrDefault(assessment => assessment.Id == id);
                response = new Response<Assessment>(true, data, "Assessment retrieved successfully");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                response = new Response<Assessment>(false, null, "Something went wrong");

                return StatusCode(500, response);
            }
            
            return Ok(response);
        }
        
        [HttpPost("")]
        public IActionResult Create([FromBody] Assessment assessment)
        {
            Response<Assessment> response;
            
            try
            {
                Assessment data = new Assessment()
                {
                    Application = assessment.Application,
                    Criteria = assessment.Criteria,
                    Feedback = assessment.Feedback,
                    Result = assessment.Result,
                    Round = assessment.Round,
                    ApplicationId = assessment.ApplicationId,
                    InterviewPanel = assessment.InterviewPanel,
                    InterviewPanelId = assessment.InterviewPanelId,
                    RoundId = assessment.RoundId
                };
                _context.Assessment.Add(data);
                _context.SaveChanges();
                response = new Response<Assessment>(true, data, "Assessment Created successfully");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                response = new Response<Assessment>(false, null, "Something went wrong");

                return StatusCode(500, response);
            }
            
            return Ok(response);
        }
        
        [HttpPut("{id}")]
        public IActionResult Modify(int id, [FromBody] Assessment changedAssessment)
        {
            Response<Assessment> response;
            try
            {
                Assessment data = _context.Assessment.FirstOrDefault(assessment => id == assessment.Id);

                if (data != null)
                {
                    data.Application = changedAssessment.Application;
                    data.Criteria = changedAssessment.Criteria;
                    data.Feedback = changedAssessment.Feedback;
                    data.Result = changedAssessment.Result;
                    data.RoundId = changedAssessment.RoundId;
                    data.ApplicationId = changedAssessment.ApplicationId;

                    _context.Assessment.Update(data);
                    _context.SaveChanges();
                    
                    response = new Response<Assessment>(true, data, "Assessment Updated successfully");
                }
                else
                {
                    response = new Response<Assessment>(false, null, "Assessment doesn't exist with given id");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                response = new Response<Assessment>(false, null, "Something went wrong");

                return StatusCode(500, response);
            }
            
            return Ok(response);
        }
        
        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            Response<Assessment> response;
            try
            {
                Assessment data = _context.Assessment.FirstOrDefault(ass => ass.Id == id);
            
                if (data != null)
                {
                    _context.Assessment.Remove(data);
                    _context.SaveChanges();
                }

                response = new Response<Assessment>(true, data, "Assessment Deleted successfully");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                response = new Response<Assessment>(false, null, "Something went wrong");

                return StatusCode(500, response);
            }
            
            return Ok(response);
        }
    }
}