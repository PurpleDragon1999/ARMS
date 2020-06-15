using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Arms.Api.Models;
using Arms.Application;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace Arms.Api.Startup
{
    public class Startup
    {
        public Startup(IConfiguration configuration,
            IHostingEnvironment environment)
        {
            _environment = environment;
            Configuration = configuration;
        }

        private readonly IHostingEnvironment _environment;
        private IConfiguration Configuration { get; }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            // string connString = this.Configuration.GetConnectionString("db");
            // services.AddDbContext<Arms.Infrastructure.ArmsDbContext>(o => o.UseSqlServer(connString));
            // services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services
                .AddCustomMvc()
                .AddCustomAuthentication(Configuration)
                .AddCustomSwagger(Configuration)
                .AddArmsApplicationServices(Configuration)
                .AddCustomDatabaseService(Configuration);

                services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            string pathBase = String.Empty;

            ConfigureAuth(app);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger()
                    .UseSwaggerUI(c =>
                    {
                        c.SwaggerEndpoint($"{ (!string.IsNullOrEmpty(pathBase) ? pathBase : string.Empty) }/swagger/v1/swagger.json", "ARMS.API V1");
                        c.OAuthClientId("lmswaggerui");
                        c.OAuthAppName("ARMS Swagger UI");
                    });
            }
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseMvcWithDefaultRoute();
        }
        
        private void ConfigureAuth(IApplicationBuilder app)
        {
            app.UseAuthentication();
        }
    }
    
    internal static class CustomExtensionsMethods
    {
        public static IServiceCollection AddCustomMvc(this IServiceCollection services)
        {
            services.Configure<RouteOptions>(options => { options.LowercaseUrls = true; });

            // Add framework services.
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddControllersAsServices();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .SetIsOriginAllowed((host) => true)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            return services;
        }

        public static IServiceCollection AddCustomAuthentication(this IServiceCollection services,
            IConfiguration configuration)
        {
            // prevent from mapping "sub" claim to nameidentifier.
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("sub");

            var identityUrl = configuration.GetValue<string>("IdentityUrl");

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = identityUrl;
                options.RequireHttpsMetadata = false;
                options.Audience = "lms";
            });

            return services;
        }

        public static IServiceCollection AddCustomSwagger(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSwaggerGen(options =>
            {
                options.DescribeAllEnumsAsStrings();
                options.SwaggerDoc("v1", new Info()
                {
                    Title = "ARMS HTTP API",
                    Version = "v1",
                    Description = "The ARMS HTTP API",
                    TermsOfService = "Terms of Service"
                });
            });

            return services;
        }

        public static IServiceCollection AddCustomDatabaseService(this IServiceCollection services, IConfiguration configuration)
        {
            Console.WriteLine(configuration.GetConnectionString("Db"));
            services.AddDbContext<ArmsDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("Db")));
            
            return services;
        }
    }
}
