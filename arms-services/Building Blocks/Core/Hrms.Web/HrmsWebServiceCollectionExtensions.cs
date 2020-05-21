using Hrms.Core.Configuration;
using EasyCaching.Core;
using EasyCaching.InMemory;
using Hrms.Core.Caching;
using Hrms.Web.Configurations;
using Hrms.Web.ExceptionHandling;
using Hrms.Web.Models;
using Hrms.Web.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Hrms.Web
{
    public static class HrmsWebServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureAspNetCore(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();

            //Use DI to create controllers
            //services.Replace(ServiceDescriptor.Transient<IControllerActivator, ServiceBasedControllerActivator>());
            
            services.AddEasyCaching();

            services.AddTransient(typeof(HrmsExceptionFilter));
            services.AddTransient(typeof(HrmsResultFilter));

            services.TryAddSingleton<IAppConfigurationProvider, AppConfigurationProvider>();
            services.TryAddSingleton<IStaticCacheManager, MemoryCacheManager>();
            services.TryAddSingleton<IErrorInfoBuilder, ErrorInfoBuilder>();
            services.TryAddSingleton<IExceptionToErrorInfoConverter, DefaultErrorInfoConverter>();
            services.AddTransient<IAppExceptionLogger, NullAppExceptionLogger>();

            services.Configure<MvcOptions>(mvcOptions =>
            {
                mvcOptions.AddHrms(services);
            });

            return services;
        }
        
        private static void AddEasyCaching(this IServiceCollection services)
        {
            services.AddEasyCaching(option =>
            {
                //use memory cache
                option.UseInMemory("hrms_memory_cache");
            });
        }
    }
}