using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class CriteriaType: Entity
    {
        public string CriteriaName { get; set; }
        public int RoundTypeId { get; set; }
    }
}