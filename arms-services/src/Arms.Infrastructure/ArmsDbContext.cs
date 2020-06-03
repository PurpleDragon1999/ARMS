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
        public DbSet<JobDescription> JobDescription { get; set; }

        public DbSet<Interview> Interview { get; set; }
        public DbSet<Round> Round { get; set; }
        public DbSet<RoundType> RoundType { get; set; }
    


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmployeeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EmployeeDetailEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new InterviewEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new JobDescriptionEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoundEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoundTypeEntityTypeConfiguration());
        }
    }
}