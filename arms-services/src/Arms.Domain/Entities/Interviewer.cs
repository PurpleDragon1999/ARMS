using Hrms.Core.Domains.Entities;
using System;

namespace Arms.Domain.Entities
{
    public partial class Interviewer
    {
        public int Id { get; set; }
        public int InterviewPanelId { get; set; }
        public int EmployeeId { get; set; }
        public ArmsEmployees Employee { get; set; }
        public int JobId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        public InterviewPanel InterviewPanel { get; set; }
    }
}