﻿using System;
using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class Resume: Entity
    {
        public string Name { get; set; }
        public byte CV { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public int ApplicationId { get; set; }

    }
}
