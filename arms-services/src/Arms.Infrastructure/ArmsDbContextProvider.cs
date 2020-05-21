using Hrms.Core.Configuration;
using Hrms.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Arms.Infrastructure
{
    public class ArmsDbContextProvider: IDbContextProvider<ArmsDbContext>
    {
        private readonly ArmsDbContext _db;

        public ArmsDbContextProvider(IAppConfigurationProvider configuration)
        {
            var builder = new DbContextOptionsBuilder<ArmsDbContext>();
            ArmsDbContextConfigurer.Configure(builder, configuration.GetConnectionString("Db"));
            _db = new ArmsDbContext(builder.Options);
        }

        public ArmsDbContext GetDbContext()
        {
            return _db;
        }
        
        public ArmsDbContext DbContext { get; }
        
    }
}