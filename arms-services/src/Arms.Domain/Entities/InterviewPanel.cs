using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Arms.Domain.Entities
{
    public partial class InterviewPanel
    {
        //public InterviewPanel()
        //{
        //    Assessment = new HashSet<Assessment>();
        //    Interviewer = new HashSet<Interviewer>();
        //}
        [Key]
        public int Id { get; set; }
        //public string Name { get; set; }
        public int RoundId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        [ForeignKey("RoundId")]
        public Round Round { get; set; }
        //public ICollection<Assessment> Assessment { get; set; }
        //public ICollection<Interviewer> Interviewer { get; set; }
    }
}