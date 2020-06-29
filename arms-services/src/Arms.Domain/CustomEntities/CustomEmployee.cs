using Arms.Domain.Entities;
using Hrms.Core.Domains.Entities;

using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.CustomEntities
{

    public class CustomEmployee : Entity
    {
        public ArmsEmployees armsEmployee { get; set; }
        public ArmsEmployeeRoles armsEmployeeRole { get; set; }
    }


}