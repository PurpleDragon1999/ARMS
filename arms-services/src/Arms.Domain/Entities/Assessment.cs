using System;
using System.Collections.Generic;
using System.Text;
using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class Assessment:Entity
    {
        public string Feedback { get; set; }
        public int RoundId { get; set; }
        public int ApplicationId { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string Result { get; set; }
        public int InterviewPanelId { get; set; }
    }
}
