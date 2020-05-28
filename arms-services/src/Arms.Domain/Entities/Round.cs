using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class Round: Entity
    {
        public int ProcessId { get; set; }
        public int RoundTypeId { get; set; }
    }
}