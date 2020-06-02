using System.Collections;
using System.Collections.Generic;
using Arms.Domain.Entities;

namespace Arms.Api.Models
{
    public interface IAssessmentRepository
    {
        Assessment GetAssessment(int id);
        IEnumerable<Assessment> GetAllAssessments();
        Assessment Add(Assessment assessment);
        Assessment Update(Assessment changedAssessment);
        Assessment Delete(int id);
    }
}