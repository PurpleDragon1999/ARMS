using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Arms.Domain.Entities
{
    public partial class ArmsEmployeeRoles
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public bool IsSystemRole { get; set; }
        public string SystemName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int RoleOrder { get; set; }
    }
}
