using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Arms.Domain.CustomEntities
{
    public class CandidateApplicationResume
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int IdProofTypeId { get; set; }
        public string IdentificationNo { get; set; }
        public string Education { get; set; }
        public string Experience { get; set; }
        public int JobId { get; set; }
        public IFormFile Cv { get; set; }
        public string nationality { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }

        
    }
}
