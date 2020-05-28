using Hrms.Core.Domains.Entities;

namespace Arms.Domain.Entities
{
    public class Interviewer: Entity
    {
        public int EmployeeId { get; set; }
        public int PanelId { get; set; }
    }
}