﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.Entities
{
    public partial class Application
    {
        public Application()
        {
            Assessment = new HashSet<Assessment>();
            Resume = new HashSet<Resume>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public DateTime DateOfApplication { get; set; }
        public string Education { get; set; }
        public string Experience { get; set; }
        public DateTime StatusChangedAt { get; set; }
        public int CandidateId { get; set; }
        public int JobId { get; set; }
        public int ApplicationStatusTypeId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }

        public ApplicationStatusType ApplicationStatusType { get; set; }
        public Candidate Candidate { get; set; }
        public JobDescription Job { get; set; }
        public ICollection<Assessment> Assessment { get; set; }
        public ICollection<Resume> Resume { get; set; }

    }
}