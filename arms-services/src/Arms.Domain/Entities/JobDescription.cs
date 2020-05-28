using System;
using System.Collections.Generic;
using Hrms.Core.Domains.Entities;
using Microsoft.AspNetCore.Http;

namespace Arms.Domain.Entities
{
    public class JobDescription: Entity
    {
        public new int Id { get; set; }
        public string code { get; set; }
        public string locationId { get; set; }
        public DateTime openingDate { get; set; }
        public DateTime closingDate { get; set; }
        public string description { get; set; }
        public long? salary { get; set; }
        public string jobTitle { get; set; }
        public int? vacancies { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime modifiedAt { get; set; }

        public Byte[] pdfBlobData { get; set; }
        public string createdBy { get; set; }
        public string modifiedBy { get; set; }
        public List<Interview> Interview { get; set; }

    }
}