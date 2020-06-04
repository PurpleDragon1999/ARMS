using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;

namespace Arms.Domain.Entities
{
    public partial class Round
    {
        public Round()
        {
            Assessment = new HashSet<Assessment>();
            InterviewPanel = new HashSet<InterviewPanel>();
        }

        public int Id { get; set; }
        public int RoundTypeId { get; set; }
        public int InterviewId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        public Interview Interview { get; set; }
        public RoundType RoundType { get; set; }
        public ICollection<Assessment> Assessment { get; set; }
        public ICollection<InterviewPanel> InterviewPanel { get; set; }
    }
}