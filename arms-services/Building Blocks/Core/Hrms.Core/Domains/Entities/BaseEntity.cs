using System;

namespace Hrms.Core.Domains.Entities
{
    [Serializable]
    public abstract class BaseEntity : BaseEntity<int>
    {

    }

    [Serializable]
    public abstract class BaseEntity<TPrimaryKey> : Entity<TPrimaryKey>
    {
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}