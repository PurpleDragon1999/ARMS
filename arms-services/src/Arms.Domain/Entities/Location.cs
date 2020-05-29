using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class Location : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}