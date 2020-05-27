using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class Criteria: Entity
    {
        public int Marks { get; set; }
        public string Remarks { get; set; }
        public int CriteriaTypeId { get; set; } 
        public int AssessmentId { get; set; } 
    }
}