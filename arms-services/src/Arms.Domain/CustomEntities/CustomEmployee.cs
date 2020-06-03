using Arms.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.CustomEntities
{

    public class CustomEmployee
    {

        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Designation { get; set; }
        public string Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
    }
}
