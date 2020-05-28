using Hrms.Core.Domains.Entities;
using System;

namespace Arms.Domain.Entities
{
    public partial class Location
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string LocationName { get; set; }
        public int JobId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }

        public JobDescription Job { get; set; }
    }
}