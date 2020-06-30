using System;
using System.Collections.Generic;
using Hrms.Core.Domains.Entities;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Arms.Domain.Entities
{
    public class JobDescription : Entity
    {


        public int Id { get; set; }
        public string code { get; set; }
        public int eligibilityCriteriaId { get; set; }
        public EligibilityCriteria eligibilityCriteria { get; set; }
        public int locationId { get; set; }
        public Loc loc { get; set; }
        public int employmentTypeId { get; set; }
        public EmploymentType employmentType { get; set; }
        public DateTime openingDate { get; set; }
        public DateTime closingDate { get; set; }
        public string description { get; set; }
        public string salary { get; set; }
        public string jobTitle { get; set; }
        public string skills { get; set; }
        public int? vacancies { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime modifiedAt { get; set; }
        public Byte[] pdfBlobData { get; set; }
        public string createdBy { get; set; }
        public string modifiedBy { get; set; }

    }
}