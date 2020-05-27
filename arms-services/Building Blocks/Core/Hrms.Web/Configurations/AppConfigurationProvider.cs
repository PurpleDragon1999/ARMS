using System;
using Hrms.Core;
using Hrms.Core.Configuration;
using Microsoft.Extensions.Configuration;

namespace Hrms.Web.Configurations
{
    public class AppConfigurationProvider : IAppConfigurationProvider
    {
        /// <summary>
        /// Implementation of Configuration for .NET core
        /// </summary>
        /// <param name="configuration">configuration</param>
        public AppConfigurationProvider(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }


        public string GetConnectionString(string key)
        {
            return Configuration.GetConnectionString(key);
        }

        public T GetSetting<T>(string key)
        {
            var valueString = GetSettingString(key);
            if (!string.IsNullOrEmpty(valueString))
                return (T)Convert.ChangeType(valueString, typeof(T));

            return default(T);
        }

        public T GetSettingOrDefault<T>(string key, T defaultValue)
        {
            var valueString = GetSettingString(key);

            if (!string.IsNullOrEmpty(valueString))
                return (T)Convert.ChangeType(valueString, typeof(T));

            return defaultValue;
        }

        public T GetValue<T>(string key)
        {
            return Configuration.GetValue<T>(key);
        }

        public string GetNotEmptySettingValue(string key)
        {
            var value = Configuration.GetValue<string>(key);

            if (string.IsNullOrWhiteSpace(value))
            {
                throw new HrmsException($"Setting value for {key} is null or empty");
            }

            return value;
        }


        private string GetSettingString(string key)
        {
            return Configuration.GetSection(key).Value;
        }
    }
}