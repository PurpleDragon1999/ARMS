using System;

namespace Arms.Domain.Entities
{
    public class Interview
    {
        public DateTime ScheduleTime { get; set; }    
        public int JobId { get; set; }
        public int ProcessId { get; set; }
    }
}