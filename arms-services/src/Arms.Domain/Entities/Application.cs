using System;
using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class Application: Entity
    {
        public DateTime DateOfApplication { get; set; }
        public string Education { get; set; }
        public DateTime StatusChangeData { get; set; }
        public int CandidateId { get; set; }
        public int JobId { get; set; }
        public int StatusId { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string Experience { get; set; }
    }
}
