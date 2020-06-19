namespace Hrms.Core.Configuration
{
    public interface IAppConfigurationProvider
    {
        /// <summary>
        /// Gets connection string by key name
        /// </summary>
        /// <param name="key">key name</param>
        /// <returns></returns>
        string GetConnectionString(string key);

        /// <summary>
        /// Gets settings string value by key
        /// </summary>
        /// <param name="key">setting key</param>
        /// <returns></returns>
        T GetSetting<T>(string key);

        /// <summary>
        /// Get settings by type and if no value returns the default object
        /// </summary>
        /// <typeparam name="T">setting type</typeparam>
        /// <param name="key">setting key</param>
        /// <param name="defaultValue">default value</param>
        /// <returns></returns>
        T GetSettingOrDefault<T>(string key, T defaultValue);

        /// <summary>
        /// Extracts the value with the specified key and converts it to type T.
        /// </summary>
        /// <typeparam name="T">The type to convert the value to.</typeparam>
        /// <param name="key">The key of the configuration section's value to convert.</param>
        /// <returns>The converted value</returns>
        T GetValue<T>(string key);

        string GetNotEmptySettingValue(string key);
    }
}