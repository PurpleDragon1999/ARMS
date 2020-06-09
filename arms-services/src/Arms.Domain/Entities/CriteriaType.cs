using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Arms.Domain.Entities
{
    public class CriteriaType : Entity
    {
        [Key]
        public int id { get; set; }
        public int roundTypeId { get; set; }
        public string code { get; set; }
        public RoundType roundType { get; set; }
        public string criteriaName { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime modifiedAt { get; set; }
        public string createdBy { get; set; }
        public string modifiedBy { get; set; }


    }
}
