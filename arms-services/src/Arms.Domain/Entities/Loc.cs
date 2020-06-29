using Hrms.Core.Domains.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace Arms.Domain.Entities
{
    public class Loc : Entity
    {   [Key]
        public int Id { get; set; }
        public string code { get; set; }
        public string locationName { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime modifiedAt { get; set; }
        public string createdBy { get; set; }
        public string modifiedBy { get; set; }


    }
}