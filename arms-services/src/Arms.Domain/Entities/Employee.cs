using System;
using System.ComponentModel.DataAnnotations;
using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{

    public partial class Employee
    {  
        public int? EmployeeDetailId { get; set; }
        public string FirstName { get; set; }
        [Key]
        public Guid UserGuid { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int PasswordFormatId { get; set; }
        public string PasswordSalt { get; set; }
        public int LocationId { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }
        public int? DivisionId { get; set; }
        public DateTime? HireDate { get; set; }
        public DateTime? LastLoginDateUtc { get; set; }
        public Location Location { get; set; }
        public EmployeeDetail EmployeeDetail { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }
}
