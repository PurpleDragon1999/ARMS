using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class InterviewPanel: Entity
    {
        public string Name { get; set; }
        public int RoundId { get; set; }        
    }
}