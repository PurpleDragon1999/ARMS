using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;

namespace Arms.Domain.Entities
{
    public partial class RoundType
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
<<<<<<< HEAD
        public ICollection<Round> Round { get; set; }
        
=======

>>>>>>> 1c64452d6a136c8841e2f2133c15cdc0791728d8
    }
}