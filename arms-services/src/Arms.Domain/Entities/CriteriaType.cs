using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;

namespace Arms.Domain.Entities
{
    public partial class CriteriaType
    {
        public CriteriaType()
        {
            Criteria = new HashSet<Criteria>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string CriteriaName { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
        public int RoundTypeId { get; set; }

        public RoundType RoundType { get; set; }
        public ICollection<Criteria> Criteria { get; set; }
    }
}