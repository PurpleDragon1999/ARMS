using System;
using System.Collections.Generic;

namespace Arms.Domain.Entities
{
    public class Interview
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string Venue { get; set; }
        public int NoOfRounds { get; set; }
        public int JobId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        public JobDescription Job { get; set; }

    }
}