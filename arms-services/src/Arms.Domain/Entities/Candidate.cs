using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.Entities
{
    public partial class Candidate
    {
        public Candidate()
        {
            Application = new HashSet<Application>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int IdProofTypeId { get; set; }
        public string IdentificationNo { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }

        public IdProofType IdProofType { get; set; }
        public ICollection<Application> Application { get; set; }

    }
}
