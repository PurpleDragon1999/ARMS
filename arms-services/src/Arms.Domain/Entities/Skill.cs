using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.Entities
{
   public class Skill:Entity
    {
        public  int Id { get; set; }
        public string skillName { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime modifiedAt { get; set; }
        public string createdBy { get; set; }
        public string modifiedBy { get; set; }
    }
}
