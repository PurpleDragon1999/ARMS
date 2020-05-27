<<<<<<< HEAD
﻿using Hrms.Core.Domains.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Arms.Domain.Entities
{
    public class JobDescription : Entity
    {
        public int Id { get; set; }
        public string code { get; set; }

        public string locationId { get; set; }
        public DateTime openingDate { get; set; }
        public DateTime closingDate { get; set; }
        public string description { get; set; }
        public long salary { get; set; }
        public string jobTitle { get; set; }
        public int vacancies { get; set; }
        public DateTime createdAt{get;set; }
        public DateTime modifiedAt { get; set; }

        public Byte[] pdfBlobData { get; set; }
        public string createdBy { get; set; }
        public string modifiedBy { get; set; }
    }
}
=======
using System;
using Hrms.Core.Domains.Entities;
using Microsoft.AspNetCore.Http;

namespace Arms.Domain.Entities
{
    public class JobDescription: Entity
    {
        public string LocationId { get; set; }
        public DateTime OpeningDate { get; set; }
        public DateTime ClosingDate { get; set; }
        public string Description { get; set; }
        public int Salary { get; set; }
        public string JobTitle { get; set; }
        public int Vacancies { get; set; }
        public IFormFile JdPdf { get; set; }
    }
}
>>>>>>> 06349e6069436c403404b6cb6369cb82ab911093
