using System;
using System.Net;
using Hrms.Core;
using Hrms.Core.Domains.Entities;
using Hrms.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;

namespace Hrms.Web.ExceptionHandling
{
    public class HrmsExceptionFilter : IExceptionFilter
    {
        private readonly IErrorInfoBuilder _errorInfoBuilder;
        private readonly IAppExceptionLogger _appExceptionLogger;

        public HrmsExceptionFilter(IErrorInfoBuilder errorInfoBuilder,
            IAppExceptionLogger appExceptionLogger)
        {
            _errorInfoBuilder = errorInfoBuilder;
            _appExceptionLogger = appExceptionLogger;
        }

        public void OnException(ExceptionContext context)
        {
            LogException(context.Exception);

            HandleAndWrapException(context);
        }

        protected virtual void HandleAndWrapException(ExceptionContext context)
        {
            context.HttpContext.Response.StatusCode = GetStatusCode(context, true);

            context.Result = new ObjectResult(
                new AjaxResponse(_errorInfoBuilder.BuildForException(context.Exception))
                );

            context.Exception = null; //Handled!
        }

        protected virtual int GetStatusCode(ExceptionContext context, bool wrapOnError)
        {
            if (context.Exception is UnauthorizedAccessException)
            {
                return context.HttpContext.User.Identity.IsAuthenticated
                    ? (int)HttpStatusCode.Forbidden
                    : (int)HttpStatusCode.Unauthorized;
            }

            if (context.Exception is UserConfirmationRequiredException
                || context.Exception is UserFriendlyException)
            {
                return (int)HttpStatusCode.OK;
            }

            if (context.Exception is EntityNotFoundException)
            {
                return (int)HttpStatusCode.NotFound;
            }

            if (wrapOnError)
            {
                return (int)HttpStatusCode.InternalServerError;
            }

            return context.HttpContext.Response.StatusCode;
        }

        private void LogException(Exception exc)
        {
            if (exc == null) return;
            if (exc is UserFriendlyException) return;

            var dto = new AppExceptionInsertDto()
            {
                StackTrace = exc.ToString(),
                Message = exc.Message,
                Type = exc.GetType().FullName
            };

            dto.Data = GetExceptionData(exc);

            _appExceptionLogger.Insert(dto);
        }

        /// <summary>
        /// serialize exception data
        /// </summary>
        /// <param name="exp">exception</param>
        /// <returns></returns>
        private static string GetExceptionData(Exception exp)
        {
            string data = null;
            try
            {
                if (exp.Data.Count != 0)
                    data = JsonConvert.SerializeObject(exp.Data);
            }
            catch
            {
                data = "error in serializing data";
            }
            return data;
        }
    }
}