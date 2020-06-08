using System;
using System.Collections.Generic;
<<<<<<< HEAD
using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class IdProofType : Entity
    {
=======
using System.Text;

namespace Arms.Domain.Entities
{
    public partial class IdProofType
    {
        public IdProofType()
        {
            Candidate = new HashSet<Candidate>();
        }

>>>>>>> 2be29f0c4f54ca4f7629f009fdac4bbae995f4b2
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
<<<<<<< HEAD
        
    }
}
=======

        public ICollection<Candidate> Candidate { get; set; }

    }
}
>>>>>>> 2be29f0c4f54ca4f7629f009fdac4bbae995f4b2
