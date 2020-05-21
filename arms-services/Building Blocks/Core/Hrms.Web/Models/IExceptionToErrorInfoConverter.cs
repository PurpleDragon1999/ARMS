using System;

namespace Hrms.Web.Models
{
    public interface IExceptionToErrorInfoConverter
    {
        ErrorInfo Convert(Exception exception);
    }
}