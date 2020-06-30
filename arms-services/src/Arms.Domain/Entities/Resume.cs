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
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
        public int ApplicationId { get; set; }
        public Application Application { get; set; }

    }

}
