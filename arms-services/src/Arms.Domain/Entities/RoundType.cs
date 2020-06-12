using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;

namespace Arms.Domain.Entities
{
    public partial class RoundType
    {
        public RoundType()
        {
            CriteriaType = new HashSet<CriteriaType>();
            Round = new HashSet<Round>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
        public ICollection<CriteriaType> CriteriaType { get; set; }
        public ICollection<Round> Round { get; set; }
    }
}