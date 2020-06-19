using System;
using Hrms.Core;

namespace Hrms.Web.Models
{
    internal class DefaultErrorInfoConverter : IExceptionToErrorInfoConverter
    {
        public ErrorInfo Convert(Exception exception)
        {
            return CreateErrorInfoWithoutCode(exception);
        }

        private ErrorInfo CreateErrorInfoWithoutCode(Exception exception)
        {
            if (exception is UserConfirmationRequiredException)
            {
                return new ErrorInfo(2002, exception.Message);
            }

            if (exception is UserFriendlyException)
            {
                if (((UserFriendlyException)exception).Code > 0)
                {
                    return new ErrorInfo(((UserFriendlyException)exception).Code, exception.Message);
                }

                return new ErrorInfo(exception.Message);
            }

            return new ErrorInfo("Internal Server Error");
        }
    }
}