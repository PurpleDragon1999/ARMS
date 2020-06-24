using System;
using System.Collections.Generic;
using System.Linq;
using Arms.Api.Models;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Internal;
using Microsoft.EntityFrameworkCore;

namespace Arms.Api.Controllers
{
    [Authorize(Roles="SuperAdministrator,Employee,Admin")]
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
                response = new Response<Assessment>(false, null, "Something went wrong");

                return StatusCode(500, response);
            }
            
            return Ok(response);
        }
        
        [HttpPost("")]
        public IActionResult Create([FromBody] AssessmentCreateData assessmentData)
        {
            Response<Assessment> response;
            
            try
            {
                int panelId = _context.InterviewPanel.FirstOrDefault(c => c.RoundId == assessmentData.RoundId).Id;
                Assessment data = new Assessment()
                {
                    Feedback = assessmentData.Feedback,
                    Result = assessmentData.Result,
                    ApplicationId = assessmentData.ApplicationId,
                    InterviewPanelId = panelId,
                    RoundId = assessmentData.RoundId
                };
                _context.Assessment.Add(data);
                _context.SaveChanges();

                int savedAssessmentId = data.Id;

                foreach (var criteria in assessmentData.Criterias)
                {
                    _context.Criteria.Add(new Domain.Entities.Criteria()
                    {
                        AssessmentId = savedAssessmentId,
                        Marks = criteria.Marks,
                        Remarks = criteria.Remarks,
                        CriteriaTypeId = criteria.CriteriaTypeId
                    });

                    _context.SaveChanges();
                }
                
                response = new Response<Assessment>(true, data, "Assessment Created successfully");
            }
            catch (Exception e)
            {
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
                response = new Response<Assessment>(false, null, "Something went wrong");

                return StatusCode(500, response);
            }
            
            return Ok(response);
        }

        [HttpGet("filtered-round-list")]
        public IActionResult RoundListOnTheBasisOfEmployeeAndJd([FromQuery(Name = "jdId")] int jdId)
        {
            var currentUserClaimsPrincipal = HttpContext.User;
            Response<List<RoundAndCriteriaType>> response;
            
            try
            {
                string currentUser = currentUserClaimsPrincipal.Claims.FirstOrDefault(c => c.Type == "Id")?.Value;

                JobDescription jd = _context.JobDescription.FirstOrDefault(c => c.Id == jdId); 
                Interview interview = _context.Interview.FirstOrDefault(c => c.JobId == jd.Id);
                List<Round> rounds = _context.Round.Where(c => c.InterviewId == interview.Id).ToList();
                List<int> roundIds = new List<int>();
                List<int> interviewPanelIds = new List<int>();
                
                foreach (var round in rounds)
                {
                    roundIds.Add(round.Id);
                    InterviewPanel interviewPanel = _context.InterviewPanel.FirstOrDefault(c => c.RoundId == round.Id);
                    interviewPanelIds.Add(interviewPanel.Id);
                }

                List<int> filteredPanelIdsForCurrentInterviewer = new List<int>();
                
                foreach (var interviewPanelId in interviewPanelIds)
                {
                    List<Interviewer> interviewsForCurrentUser = _context.Interviewer
                        .Where(c => c.EmployeeId == Int32.Parse(currentUser) && c.InterviewPanelId == interviewPanelId).ToList();

                    foreach (var interviews in interviewsForCurrentUser)
                    {
                        filteredPanelIdsForCurrentInterviewer.Add(interviews.InterviewPanelId);   
                    }
                }

                List<int> filteredRoundIdsForCurrentUser = new List<int>();
                foreach (var id in filteredPanelIdsForCurrentInterviewer)
                {
                    var filteredInterviewPanelsForCurrentUser = _context.InterviewPanel.Where(c => c.RoundId == id).ToList();
                    foreach (var interviewPanel in filteredInterviewPanelsForCurrentUser)
                    {
                        filteredRoundIdsForCurrentUser.Add(interviewPanel.Id);
                    }
                }

                List<int> filteredRoundIds = new List<int>();
                foreach (var id in filteredRoundIdsForCurrentUser)
                {
                    var filteredRoundList = _context.Round.Where(c => c.Id == id).ToList();

                    foreach (var round in filteredRoundList)
                    {
                        filteredRoundIds.Add(round.Id);
                    }
                }

                List<int> filteredRoundTypeIds = new List<int>();
                foreach (var id in filteredRoundIds)
                {
                    var round = _context.Round.FirstOrDefault(c => c.Id == id);
                    filteredRoundTypeIds.Add(round.RoundTypeId);
                }

                List<List<CriteriaType>> criteriaTypes = new List<List<CriteriaType>>();
                foreach (var roundTypeId in filteredRoundTypeIds)
                {
                    var criteriaTypesForSpecificRoundType = _context.CriteriaType.Include(x => x.roundType).Where(c => c.roundTypeId == roundTypeId).ToList();
                    criteriaTypes.Add(criteriaTypesForSpecificRoundType);
                }

                List<RoundAndCriteriaType> RoundAndCriteriaTypeList = new List<RoundAndCriteriaType>();
                foreach (var criteriaType in criteriaTypes)
                {
                    foreach (var criteria in criteriaType)
                    {
                        var roundId = criteria.roundType.Round.First().Id;
                        RoundAndCriteriaTypeList.Add(new RoundAndCriteriaType(criteria.roundType.Name, criteria.criteriaName, roundId, criteria.Id));
                    }
                }

                response = new Response<List<RoundAndCriteriaType>>(true, RoundAndCriteriaTypeList, "Assessment Updated successfully");
            }
            catch (Exception e)
            {
                response = new Response<List<RoundAndCriteriaType>>(false, null, "Something went wrong");
                return StatusCode(500, response);
            }

            return Ok(response);
        }
    }

    internal class RoundAndCriteriaType
    {
        public string RoundTypeName;
        public string CriteriaName;
        public int? RoundId;
        public int CriteriaTypeId;

        public RoundAndCriteriaType(string roundTypeName, string criteriaName, int roundId, int criteriaTypeId)
        {
            this.RoundTypeName = roundTypeName;
            this.CriteriaName = criteriaName;
            this.RoundId = roundId;
            this.CriteriaTypeId = criteriaTypeId;
        }
    }

    public class AssessmentCreateData
    {
        public int RoundId;
        public int ApplicationId;
        public string Feedback;
        public bool Result;
        public int InterviewPanelId;
        public List<Criteria> Criterias;
    }

    public class Criteria
    {
        public int CriteriaTypeId;
        public int Marks;
        public string Remarks;
        public int AssessmentId;
    }
}