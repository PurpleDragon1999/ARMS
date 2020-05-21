using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Arms.Infrastructure
{
    public class ArmsDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ArmsDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ArmsDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}