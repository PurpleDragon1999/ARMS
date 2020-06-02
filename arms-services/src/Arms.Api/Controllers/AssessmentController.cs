using System;
using System.Collections.Generic;
using Arms.Api.Models;
using Arms.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    public class AssessmentController : BaseController
    {
        private readonly IAssessmentRepository _assessmentRepository;
        
        AssessmentController(IAssessmentRepository assessmentRepository)
        {
            this._assessmentRepository = assessmentRepository;
        }

        [HttpGet("")]
        public IActionResult Index()
        {
            Response<IEnumerable<Assessment>> response;
            IEnumerable<Assessment> data = null;
            try
            {
                data = _assessmentRepository.GetAllAssessments();
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
            Assessment data = null;
            try
            {
                data = _assessmentRepository.GetAssessment(id);
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
            Assessment data = null;
            try
            {
                data = _assessmentRepository.Add(assessment);
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
        public IActionResult Modify([FromBody] Assessment assessment)
        {
            Response<Assessment> response;
            Assessment data = null;
            try
            {
                data = _assessmentRepository.Update(assessment);
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
            Assessment data = null;
            try
            {
                data = _assessmentRepository.Delete(id);
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