using Hrms.Core.Domains.Entities;
using System;

namespace Arms.Domain.Entities
{
    public partial class Criteria
    {
        public int Id { get; set; }
        public int Marks { get; set; }
        public string Remarks { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
        public int CriteriaTypeId { get; set; }
        public int AssessmentId { get; set; }

        public Assessment Assessment { get; set; }
        public CriteriaType CriteriaType { get; set; }
    }
}