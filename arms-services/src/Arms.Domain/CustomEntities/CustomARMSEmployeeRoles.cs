using Arms.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.CustomEntities
{

    public class CustomARMSEmployee
    {

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