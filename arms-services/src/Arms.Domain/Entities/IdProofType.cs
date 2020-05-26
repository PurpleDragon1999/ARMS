using System;
using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class IdProofType: Entity
    {
        public string Name { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }
}
