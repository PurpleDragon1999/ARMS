using Arms.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.CustomEntities
{
    
    public class CustomInterview
    {
        
        public int Id { get; set; }
        public string Code { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string Venue { get; set; }
        public int JobId { get; set; }
        public int NoOfRounds { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
        public List<Round> Round { get; set; }
    }
}
