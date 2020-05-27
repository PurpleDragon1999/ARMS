using Arms.Api.Models;
using Arms.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    public class AssessmentController : Controller
    {
        private readonly IAssessmentRepository _assessmentRepository;

        AssessmentController(IAssessmentRepository assessmentRepository)
        {
            this._assessmentRepository = assessmentRepository;
        }

        [HttpGet("")]
        private JsonResult Index()
        {
            var model = _assessmentRepository.GetAllAssessments();
            return Json(model);
        }
        
        [HttpGet("{id}")]
        private JsonResult Show(int id)
        {
            var model = _assessmentRepository.GetAssessment(id);
            return Json(model);
        }
        
        [HttpPost("")]
        private JsonResult Create(Assessment assessment)
        {
            var model = _assessmentRepository.Add(assessment);
            return Json(model);
        }
        
        [HttpPut("")]
        private JsonResult Modify(Assessment assessment)
        {
            var model = _assessmentRepository.Update(assessment);
            return Json(model);
        }
        
        [HttpDelete("{id}")]
        private JsonResult Remove(int id)
        {
            var model = _assessmentRepository.Delete(id);
            return Json(model);
        }
    }
}