using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Arms.Domain.Entities
{
   public  class EmploymentType:Entity
    {

        [Key]
        public int Id { get; set; }
     
        public string employmentTypeName { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime modifiedAt { get; set; }
        public string createdBy { get; set; }
        public string modifiedBy { get; set; }

    }
}
