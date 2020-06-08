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

        public DbSet<Assessment> Assessments { get; set; }
        // public DbSet<Criteria> Criterias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmployeeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EmployeeDetailEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new JobDescriptionEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationStatusTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new AssessmentEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CandidateEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CriteriaEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CriteriaTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new IdProofTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ImagesEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new InterviewEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new InterviewerEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new InterviewPanelEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new LocationEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ResumeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoundEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoundTypeEntityTypeConfiguration());
        }
    }
}