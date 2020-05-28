using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.Entities
{
    public partial class Assessment
    {
        public Assessment()
        {
            Criteria = new HashSet<Criteria>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string Feedback { get; set; }
        public string Result { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
        public int RoundId { get; set; }
        public int ApplicationId { get; set; }
        public int InterviewPanelId { get; set; }

        public Application Application { get; set; }
        public InterviewPanel InterviewPanel { get; set; }
        public Round Round { get; set; }
        public ICollection<Criteria> Criteria { get; set; }

    }
}
