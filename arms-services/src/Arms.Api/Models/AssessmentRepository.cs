
using System.Collections.Generic;
using System.Net.Http.Headers;
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
            return _context.Assessments.Find(id);
        }

        public IEnumerable<Assessment> GetAllAssessments()
        {
            return _context.Assessments;
        }

        public Assessment Add(Assessment assessment)
        {
            _context.Assessments.Add(assessment);
            _context.SaveChanges();
            return assessment;
        }

        public Assessment Update(Assessment assessmentChanges)
        {
            var employee = _context.Assessments.Attach(assessmentChanges);
            employee.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return assessmentChanges;
        }

        public Assessment Delete(int id)
        {
            Assessment assessment = _context.Assessments.Find(id);

            if (assessment != null)
            {
                _context.Assessments.Remove(assessment);
                _context.SaveChanges();
            }
            return assessment;
        }
    }
}