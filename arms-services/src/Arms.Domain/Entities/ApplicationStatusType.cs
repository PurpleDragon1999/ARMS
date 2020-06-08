using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;

namespace Arms.Domain.Entities
{
<<<<<<< HEAD
    public class ApplicationStatusType : Entity
    {
=======
    public partial class ApplicationStatusType
    {
        public ApplicationStatusType()
        {
            Application = new HashSet<Application>();
        }

>>>>>>> 2be29f0c4f54ca4f7629f009fdac4bbae995f4b2
        public int Id { get; set; }
        public string Code { get; set; }
        public string StatusName { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
<<<<<<< HEAD
        
        
=======

        public ICollection<Application> Application { get; set; }
>>>>>>> 2be29f0c4f54ca4f7629f009fdac4bbae995f4b2
    }
}