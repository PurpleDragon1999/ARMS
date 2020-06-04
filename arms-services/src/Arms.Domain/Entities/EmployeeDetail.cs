using System;
using System.ComponentModel.DataAnnotations;

namespace Arms.Domain.Entities
{
    public class EmployeeDetail

    {   [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmployeeCode { get; set; }
        public string MaritalStatus { get; set; }
        public EmployeeGender? Gender { get; set; }
        public int? ReportingManagerId { get; set; }
    }
}
