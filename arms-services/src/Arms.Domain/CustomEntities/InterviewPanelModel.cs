using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.CustomEntities
{
    public partial class round
    {
        public List<roundPanel> rounds { get; set; }
    }

    public partial class roundPanel
    {
        public int roundId { get; set; }
        public List<Panel> Panel { get; set; }
    }

    public partial class Panel
    {
        public string PanelName { get; set; }
        public int? PanelId { get; set; }
        public List<int> employeesId { get; set; }
    }

}
