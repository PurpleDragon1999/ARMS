using System;

namespace Hrms.Web.Models
{
    public interface IErrorInfoBuilder
    {
        ErrorInfo BuildForException(Exception exception);
    }
}