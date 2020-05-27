using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class Process: Entity
    {
        public string Name { get; set; }
        public int NumberOfRounds { get; set; }
    }
}