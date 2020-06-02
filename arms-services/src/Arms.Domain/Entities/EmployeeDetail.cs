using System;

namespace Arms.Domain.Entities
{
    public class EmployeeDetail
    {   
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmployeeCode { get; set; }
        public string MaritalStatus { get; set; }
        public EmployeeGender? Gender { get; set; }
        public int? ReportingManagerId { get; set; }
    }
}
