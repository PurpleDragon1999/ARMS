using Hrms.Core.Domains.Entities;
using System;

namespace Arms.Domain.Entities
{
    public class ApplicationStatusType: Entity
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string StatusName { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
    }
}