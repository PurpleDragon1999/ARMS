using System;
using Arms.Application.Services.Users;
using Arms.Infrastructure;
using Hrms.EntityFrameworkCore;
using Hrms.EntityFrameworkCore.Repositories;
using Hrms.Web;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Arms.Application
{
    public static class ArmsApplicationServiceCollectionExtensions
    {
        public static IServiceCollection AddArmsApplicationServices(this IServiceCollection services,
            IConfiguration configuration)
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }
            
            services.ConfigureAspNetCore();
            
            // Register database services
            services.AddTransient<IDbContextProvider<ArmsDbContext>, ArmsDbContextProvider>();
            services.AddTransient(typeof(IRepository<>), typeof(ArmsEfCoreRepository<>));

            services.AddTransient<IIdentityService, IdentityService>();

            return services;
        }
    }
}