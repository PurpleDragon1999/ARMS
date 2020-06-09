using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;

namespace Arms.Domain.Entities
{

    public partial class ApplicationStatusType : Entity
    {
    
        public ApplicationStatusType()
        {
            Application = new HashSet<Application>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string StatusName { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
        public ICollection<Application> Application { get; set; }
    }
}