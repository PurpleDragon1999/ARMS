using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.Entities
{
    public partial class Resume
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] Cv { get; set; }
        public int ApplicationId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }

        public Application Application { get; set; }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 2be29f0c4f54ca4f7629f009fdac4bbae995f4b2
