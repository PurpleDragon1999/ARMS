using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.Entities
{
    public partial class Images
    {
        public int Id { get; set; }
        public byte[] ImageBlobData { get; set; }
        public int EmployeeId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }

        //public HrmsEmployee Employee { get; set; }
    }
}
