using System;
using Hrms.Web.Extensions;
using Hrms.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Hrms.Web.Results
{
    public class HrmsResultFilter : IResultFilter
    {
        public void OnResultExecuting(ResultExecutingContext context)
        {
            if (!context.ActionDescriptor.IsControllerAction())
            {
                return;
            }

            if (context.Result is ObjectResult)
            {
                var objectResult = context.Result as ObjectResult;

                if (!(objectResult.Value is AjaxResponseBase))
                {
                    objectResult.Value = new AjaxResponse(objectResult.Value);
                    objectResult.DeclaredType = typeof(AjaxResponse);
                }
            }

            if (context.Result is JsonResult)
            {
                var jsonResult = context.Result as JsonResult;

                if (!(jsonResult.Value is AjaxResponseBase))
                {
                    jsonResult.Value = new AjaxResponse(jsonResult.Value);
                }
            }
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {

        }
    }
}