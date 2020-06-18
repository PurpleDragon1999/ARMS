using System;

namespace Hrms.Web.ExceptionHandling
{
    public class AppExceptionInsertDto
    {
        public string Type { get; set; }
        public string StackTrace { get; set; }
        public string Message { get; set; }
        public string Data { get; set; }
        public Guid? UserId { get; set; }
    }
}