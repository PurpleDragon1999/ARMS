using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.Entities
{
    public class ArmsEmployees : Entity
    {
        public int Id { get; set; }
        public int? SpringAheadId { get; set; }
        public int? DivisionId { get; set; }
        public Guid UserGuid { get; set; }
        public string Initials { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int PasswordFormatId { get; set; }
        public string PasswordSalt { get; set; }
        public string AdminComment { get; set; }
        public bool Active { get; set; }
        public bool IsSystemAccount { get; set; }
        public string SystemName { get; set; }
        public string LastIpAddress { get; set; }
        public DateTime? LastLoginDateUtc { get; set; }
        public DateTime LastActivityDateUtc { get; set; }
        public bool Deleted { get; set; }
        public string ProfileImage { get; set; }
        public bool IsAllowLogin { get; set; }
        public int? EmployeeDetailId { get; set; }
        public bool PasswordResetRequired { get; set; }
        public int Location { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public decimal? Experience { get; set; }
        public int? VisaTypeId { get; set; }
        public int? DesignationId { get; set; }
        public string ResumeFileName { get; set; }
        public bool? OffshoreResources { get; set; }
        public string NickName { get; set; }
        public DateTime? HireDate { get; set; }
        public decimal? RelevantExperience { get; set; }
        public bool? VisibilityRmcallender { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
        public int? PreviousDesignationId { get; set; }
        public string IntacctId { get; set; }
    }
}