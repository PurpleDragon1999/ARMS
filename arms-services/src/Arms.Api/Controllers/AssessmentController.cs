using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Arms.Api.Models;
using Arms.Application.Services.Users;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    public class AssessmentController : BaseController
    {
        private readonly ArmsDbContext _context;
        
        private AssessmentController(ArmsDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            Response<IEnumerable<Assessment>> response;
            
            try
            {
                List<Assessment> data = _context.Assessments.ToList();
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
                Assessment data = _context.Assessments.SingleOrDefault(assessment => assessment.Id == id);
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
                    Code = assessment.Code,
                    Criteria = assessment.Criteria,
                    Feedback = assessment.Feedback,
                    Result = assessment.Result,
                    Round = assessment.Round,
                    ApplicationId = assessment.ApplicationId,
                    InterviewPanel = assessment.InterviewPanel,
                    InterviewPanelId = assessment.InterviewPanelId,
                    RoundId = assessment.RoundId
                };
                _context.Assessments.Add(data);
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
        
        [HttpPut("")]
        public IActionResult Modify([FromBody] Assessment changedAssessment)
        {
            Response<Assessment> response;
            try
            {
                Assessment data = _context.Assessments.SingleOrDefault(assessment => assessment.Id == changedAssessment.Id);

                if (data != null)
                {
                    data = changedAssessment;
                    _context.Assessments.Update(changedAssessment);
                    _context.SaveChanges();
                }
                response = new Response<Assessment>(true, data, "Assessment Updated successfully");
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
                Assessment data = _context.Assessments.SingleOrDefault(ass => ass.Id == id);
            
                if (data != null)
                {
                    _context.Assessments.Remove(data);
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