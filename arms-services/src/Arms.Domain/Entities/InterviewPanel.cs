using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;

namespace Arms.Domain.Entities
{
    public partial class InterviewPanel
    {
        //public InterviewPanel()
        //{
        //    Assessment = new HashSet<Assessment>();
        //    Interviewer = new HashSet<Interviewer>();
        //}

        public int Id { get; set; }
        public int RoundId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        public Round Round { get; set; }
        //public ICollection<Assessment> Assessment { get; set; }
        //public ICollection<Interviewer> Interviewer { get; set; }
    }
}