using System;

namespace Hrms.Web.Models
{
    public class ErrorInfoBuilder : IErrorInfoBuilder
    {
        private readonly IExceptionToErrorInfoConverter _converter;

        public ErrorInfoBuilder(IExceptionToErrorInfoConverter converter)
        {
            _converter = converter;
        }

        public ErrorInfo BuildForException(Exception exception)
        {
            return _converter.Convert(exception);
        }
    }
}