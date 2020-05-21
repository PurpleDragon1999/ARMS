using Hrms.Web.ExceptionHandling;
using Hrms.Web.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Hrms.Web
{
    internal static class HrmsMvcOptionsExtensions
    {
        public static void AddHrms(this MvcOptions options, IServiceCollection services)
        {
            AddActionFilters(options);
        }

        private static void AddActionFilters(MvcOptions options)
        {
            options.Filters.AddService(typeof(HrmsExceptionFilter));
            options.Filters.AddService(typeof(HrmsResultFilter));
        }
    }
}