
using Arms.Domain.Entities;
using Arms.Infrastructure.EntityTypeConfigurations;
using Microsoft.EntityFrameworkCore;

namespace Arms.Infrastructure
{
    public class ArmsDbContext: DbContext
    {
        public ArmsDbContext(DbContextOptions<ArmsDbContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Candidate> Candidate { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmployeeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EmployeeDetailEntityTypeConfiguration());
        }
    }
}