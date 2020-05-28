using System;
using System.Collections.Generic;
using Hrms.Core.Domains.Entities;
using Microsoft.AspNetCore.Http;

namespace Arms.Domain.Entities
{
    public partial class JobDescription
    {
        public JobDescription()
        {
            Application = new HashSet<Application>();
            Interview = new HashSet<Interview>();
            LocationNavigation = new HashSet<Location>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string JobTitle { get; set; }
        public DateTime OpeningDate { get; set; }
        public DateTime ClosingDate { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public long? Salary { get; set; }
        public int? Vacancies { get; set; }
        public byte[] PdfBlobData { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        public ICollection<Application> Application { get; set; }
        public ICollection<Interview> Interview { get; set; }
        public ICollection<Location> LocationNavigation { get; set; }
    }
}