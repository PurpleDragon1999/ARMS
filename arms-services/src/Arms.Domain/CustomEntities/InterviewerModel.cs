using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.CustomEntities
{
    public partial class InterviewerModel
    {
        public List<int> EmployeesId { get; set; }
        public int PanelId { get; set; }
    }

    public partial class InterviewerModelData
    {
        public int EmployeeId { get; set; }
        public int PanelId { get; set; }
    }
}
