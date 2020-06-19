using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Domain.CustomEntities
{
    public partial class Response
    {
        public string success { get; set; }
        public Payload payload { get; set; }
    }

    public partial class Payload
    {
        public string msg { get; set; }
        public object data { get; set; }
    }
}
