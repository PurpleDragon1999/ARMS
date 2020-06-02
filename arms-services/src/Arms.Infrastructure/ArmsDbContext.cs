using Arms.Infrastructure.EntityTypeConfigurations;
using Microsoft.EntityFrameworkCore;
using Arms.Domain.Entities;

namespace Arms.Infrastructure
{
    public class ArmsDbContext: DbContext
    {
        public ArmsDbContext(DbContextOptions<ArmsDbContext> options)
            : base(options)
        {
        }
        public DbSet<ARMSEmployee> ARMSEmployee { get; set; }
       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ARMSEmployeeEntityTypeConfiguration());
           
        }
    }
}