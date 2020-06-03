<<<<<<< HEAD
﻿namespace Arms.Domain.Entities
{
    public class Location
=======
using Hrms.Core.Domains.Entities;
using System;

namespace Arms.Domain.Entities
{
    public partial class Location
>>>>>>> 745dd668a5697c890f6fbba5f78a466656a41b76
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string LocationName { get; set; }
        public int JobId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }

        public JobDescription Job { get; set; }
    }
}