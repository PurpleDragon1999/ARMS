using System;

namespace Hrms.Core.Domains.Entities.Exceptions
{
    public class AppExceptionEntity : Entity<long>
    {
        public Guid? UserGuid { get; set; }
        public string Type { get; set; }
        public string StackTrace { get; set; }
        public string Message { get; set; }
        public string Data { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
