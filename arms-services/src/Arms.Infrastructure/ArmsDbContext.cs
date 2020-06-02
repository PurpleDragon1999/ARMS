using Arms.Domain.Entities;
using Arms.Infrastructure.EntityTypeConfigurations;
using Microsoft.EntityFrameworkCore;

namespace Arms.Infrastructure
{
    public  class ArmsDbContext: DbContext
    {
      

        public ArmsDbContext(DbContextOptions<ArmsDbContext> options)
            : base(options)
        {
        }
        public virtual DbSet<JobDescription> JobDescription { get; set; }
        public virtual DbSet<EmploymentType> employmentType  { get; set; }
        public virtual DbSet<EligibilityCriteria>eligibilityCriteria { get; set; }
        public virtual DbSet<CriteriaType> CriteriaType { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.ApplyConfiguration(new EmployeeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EmployeeDetailEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new JobDescriptionEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new LocEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EmploymentTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EligibilityCriteriaEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CriteriaTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoundTypeEntityTypeConfiguration());

        }
    }
}