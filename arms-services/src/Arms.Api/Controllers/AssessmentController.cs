using System;
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
        public JsonResult Index()
        {
            var model = _assessmentRepository.GetAllAssessments();
            return Json(model);
        }
        
        [HttpGet("{id}")]
        public JsonResult Show(int id)
        {
            var model = _assessmentRepository.GetAssessment(id);
            return Json(model);
        }
        
        [HttpPost("")]
        public JsonResult Create([FromBody] Assessment assessment)
        {
            var model = _assessmentRepository.Add(assessment);
            return Json(model);
        }
        
        [HttpPut("")]
        public JsonResult Modify([FromBody] Assessment assessment)
        {
            var model = _assessmentRepository.Update(assessment);
            return Json(model);
        }
        
        [HttpDelete("{id}")]
        public JsonResult Remove(int id)
        {
            var model = _assessmentRepository.Delete(id);
            return Json(model);
        }
    }
}