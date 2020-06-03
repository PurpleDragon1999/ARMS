using Hrms.Core.Domains.Entities;
using System;

namespace Arms.Domain.Entities
{
    public class RoundType: Entity
    {
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
    }
}