using Hrms.Core.Domains.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.CustomEntities
{
    public class LoginReq:Entity
    {
        public string idToken { get; set; }
    }
}
