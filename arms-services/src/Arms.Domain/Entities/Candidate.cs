
using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    class Candidate :Entity
    {
        public int id { get; set; }
        public string code { get; set; }
        public string name {get; set;}
        public string email { get; set; }
        public string phone { get; set; }
        public string idProofTypeId { get; set; }
        public string identificationNo { get; set; }
        public DateTime createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime modifiedAt { get; set; }
        public DateTime modifiedBy { get; set; }
       
    }
}
