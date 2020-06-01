using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Hrms.Core.Domains.Entities;
using Microsoft.AspNetCore.Http;

namespace Arms.Domain.Entities
{
    public class JobDescription: Entity
    {
        public int Id { get; set; }
        public string Code { get; set; }
       // public string LocationId { get; set; }
        public DateTime OpeningDate { get; set; }
        public DateTime ClosingDate { get; set; }
        public string Description { get; set; }
        public long? Salary { get; set; }
        public string JobTitle { get; set; }
        public int? Vacancies { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }

        public Byte[] PdfBlobData { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

    }
}