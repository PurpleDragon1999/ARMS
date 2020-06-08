<<<<<<< HEAD
﻿using System;
using System.Collections.Generic;
=======
>>>>>>> 2be29f0c4f54ca4f7629f009fdac4bbae995f4b2
using Hrms.Core.Domains.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Arms.Domain.Entities
{
    public class JobDescription : Entity
    {
<<<<<<< HEAD
        public string LocationId { get; set; }
        public DateTime OpeningDate { get; set; }
        public DateTime ClosingDate { get; set; }
        public string Description { get; set; }
        public int Salary { get; set; }
        public string JobTitle { get; set; }
        public int Vacancies { get; set; }
        public byte[] JdPdf { get; set; }
=======
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
        public long? salary { get; set; }
        public string jobTitle { get; set; }
        public int? vacancies { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime modifiedAt { get; set; }
        public Byte[] pdfBlobData { get; set; }
        public string createdBy { get; set; }
        public string modifiedBy { get; set; }

>>>>>>> 2be29f0c4f54ca4f7629f009fdac4bbae995f4b2

    }
}