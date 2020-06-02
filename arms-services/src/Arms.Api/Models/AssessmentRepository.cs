
using System.Collections.Generic;
using System.Linq;
using Arms.Domain.Entities;
using Arms.Infrastructure;

namespace Arms.Api.Models
{
    public class AssessmentRepository : IAssessmentRepository
    {
        private readonly ArmsDbContext _context;

        AssessmentRepository(ArmsDbContext context)
        {
            this._context = context;
        }
        
        public Assessment GetAssessment(int id)
        {
            Assessment assessmentToReturn = _context.Assessments.SingleOrDefault(assessment => assessment.Id == id);
            return assessmentToReturn;
        }

        public IEnumerable<Assessment> GetAllAssessments()
        {
            List<Assessment> assessmentsToReturn = _context.Assessments.ToList();
            return assessmentsToReturn;
        }

        public Assessment Add(Assessment assessment)
        {
            Assessment newAssessment = new Assessment()
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
            
            _context.Assessments.Add(newAssessment);
            _context.SaveChanges();

            return newAssessment;
        }

        public Assessment Update(Assessment changedAssessment)
        {
            Assessment assessmentToUpdate =
                _context.Assessments.SingleOrDefault(assessment => assessment.Id == changedAssessment.Id);

            if (assessmentToUpdate != null)
            {
                assessmentToUpdate = changedAssessment;
                _context.Assessments.Update(assessmentToUpdate);
                _context.SaveChanges();
            }
            
            return assessmentToUpdate;
        }

        public Assessment Delete(int id)
        {
            Assessment assessment = _context.Assessments.SingleOrDefault(ass => ass.Id == id);
            
            if (assessment != null)
            {
                _context.Assessments.Remove(assessment);
                _context.SaveChanges();
            }
            
            return assessment;
        }
    }
}