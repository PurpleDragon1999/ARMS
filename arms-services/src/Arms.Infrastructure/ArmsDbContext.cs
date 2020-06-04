
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
        public virtual DbSet<IdProofType> IdProofType { get; set; }
        public virtual DbSet<Assessment> Assessment { get; set; }
        public virtual DbSet<Applications> Applications { get; set; }
        public virtual DbSet<Resume> Resume { get; set; }
        public virtual DbSet<ApplicationStatusType> ApplicationStatusType { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmployeeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EmployeeDetailEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CandidateEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new IdProofTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new AssessmentEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ResumeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationStatusTypeEntityTypeConfiguration());

        }
    }
}