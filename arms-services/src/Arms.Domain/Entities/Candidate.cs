using System;
using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class Candidate: Entity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public int IdProof { get; set; }
        public string IdentificationNo { get; set; }
        

    }
}
