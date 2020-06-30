using System;
using System.Collections.Generic;
using System.Linq;
using Arms.Api.Middlewares;
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
        
        [HttpGet("round/{roundId}/application/{applicationId}")]
        public IActionResult GetAssessmentAndCriteria(int roundId, int applicationId)
        {
            Response<AssessmentAndCriteria> response;
            
            try
            {
                int panelId = _context.InterviewPanel.FirstOrDefault(panel => panel.RoundId == roundId).Id;
                Assessment assessmentData = _context.Assessment.FirstOrDefault(assessment => (assessment.RoundId == roundId) && (assessment.ApplicationId == applicationId) && (assessment.InterviewPanelId == panelId));
                if (assessmentData == null)
                {
                    response = new Response<AssessmentAndCriteria>(true, null, "Data doesn't exist");
                    return Ok(response);
                }
                List<Criteria> criteriaList = _context.Criteria.Where(c => c.AssessmentId == assessmentData.Id).ToList();
                assessmentData.Criteria = null;
                AssessmentAndCriteria assessmentAndCriteria = new AssessmentAndCriteria()
                {
                    assessment = assessmentData,
                    criterias = criteriaList
                };
                response = new Response<AssessmentAndCriteria>(true, assessmentAndCriteria, "Assessment retrieved successfully");
            }
            catch (Exception e)
            {
                response = new Response<AssessmentAndCriteria>(false, null, "Something went wrong");

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
                var decodedToken = new TokenDecoder(Request);
                int panelId = _context.InterviewPanel.FirstOrDefault(c => c.RoundId == assessmentData.RoundId).Id;

                foreach (var criteria in assessmentData.Criterias)
                {
                    if (!(criteria.Marks > 0 && criteria.Marks < 10))
                    {
                        throw new Exception("Please enter appropriate marks for criteria");
                    }

                    if (criteria.Remarks == null)
                    {
                        throw new Exception("Stop messing with developer tools or breaking our API");
                    }
                }

                if (panelId == 0)
                {
                    throw new Exception("This feature doesn't suits you");
                }

                Assessment data = new Assessment()
                {
                    Feedback = assessmentData.Feedback,
                    Result = assessmentData.Result,
                    ApplicationId = assessmentData.ApplicationId,
                    InterviewPanelId = panelId,
                    RoundId = assessmentData.RoundId,
                    CreatedBy = decodedToken.id,
                    ModifiedBy= decodedToken.id
                };

                Assessment isAssessmentExist = _context.Assessment.FirstOrDefault(assessment => (assessment.RoundId == assessmentData.RoundId) && (assessment.ApplicationId == assessmentData.ApplicationId) && (assessment.InterviewPanelId == panelId));
                if (isAssessmentExist != null)
                {
                    return UpdateAssessmentAndCriteria(isAssessmentExist, assessmentData, panelId);
                }
                
                _context.Assessment.Add(data);
                _context.SaveChanges();

                int savedAssessmentId = data.Id;

                foreach (var criteria in assessmentData.Criterias)
                {
                    var criteriaToAdd = new Criteria()
                    {
                        AssessmentId = savedAssessmentId,
                        Marks = criteria.Marks,
                        Remarks = criteria.Remarks,
                        CriteriaTypeId = criteria.CriteriaTypeId,
                        CreatedBy = decodedToken.id,
                        ModifiedBy=decodedToken.id
                    };
                    _context.Criteria.Add(criteriaToAdd);

                    _context.SaveChanges();
                }
                
                response = new Response<Assessment>(true, null, "Assessment Created successfully");
            }
            catch (Exception e)
            {
                response = new Response<Assessment>(false, null, e.Message);

                return StatusCode(500, response);
            }
            
            return Ok(response);
        }

        IActionResult UpdateAssessmentAndCriteria(Assessment previousAssessment, AssessmentCreateData assessmentData, int panelId)
        {
            Response<Assessment> response;
            TokenDecoder decodedToken = new TokenDecoder(Request);
            
            try
            {
                previousAssessment.Feedback = assessmentData.Feedback;
                previousAssessment.Result = assessmentData.Result;
                previousAssessment.ApplicationId = assessmentData.ApplicationId;
                previousAssessment.InterviewPanelId = panelId;
                previousAssessment.RoundId = assessmentData.RoundId;
                previousAssessment.ModifiedBy = decodedToken.id;

                _context.Assessment.Update(previousAssessment);
                _context.SaveChanges();

                List<Criteria> criteriaList =
                    _context.Criteria.Where(c => c.AssessmentId == previousAssessment.Id).ToList();

                foreach (var criteria in criteriaList)
                {
                    _context.Criteria.Remove(criteria);
                    _context.SaveChanges();
                }

                foreach (var criteria in assessmentData.Criterias)
                {
                    var criteriaToAdd = new Criteria()
                    {
                        AssessmentId = previousAssessment.Id,
                        Marks = criteria.Marks,
                        Remarks = criteria.Remarks,
                        CriteriaTypeId = criteria.CriteriaTypeId,
                        CreatedBy = decodedToken.id,
                        ModifiedBy = decodedToken.id
                    };
                    _context.Criteria.Add(criteriaToAdd);

                    _context.SaveChanges();
                }
                
                response = new Response<Assessment>(true, null, "Assessment Updated successfully");
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
                List<Round> rounds = _context.Round.Where(c => c.InterviewId == interview.Id)?.ToList();
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
                        var roundTypeId = criteria.roundType.Id;
                        var roundId = _context.Round.FirstOrDefault(c => c.RoundTypeId == roundTypeId).Id;
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
        public List<InternalCriteria> Criterias;
    }

    public class InternalCriteria
    {
        public int CriteriaTypeId;
        public int Marks;
        public string Remarks;
        public int AssessmentId;
    }

    internal class AssessmentAndCriteria
    {
        public Assessment assessment;
        public List<Criteria> criterias;
    }
}