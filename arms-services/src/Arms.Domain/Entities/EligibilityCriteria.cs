using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Arms.Domain.Entities
{
    public class EligibilityCriteria:Entity
    {
      [Key]
        public int id { get; set; }

        public string eligibilityCriteriaName { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime modifiedAt { get; set; }
        public string createdBy { get; set; }
        public string modifiedBy { get; set; }
      
    }
}
