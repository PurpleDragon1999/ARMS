using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.CustomEntities
{
   public class CustomEmail:Entity
    {
        public string[] emailList { get; set; }
        
        public int jobDescriptionId { get; set; }
    }
}
