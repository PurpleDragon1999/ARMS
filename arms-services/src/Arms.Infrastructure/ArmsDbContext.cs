using Arms.Domain.Entities;
using Arms.Infrastructure.EntityTypeConfigurations;
using Microsoft.EntityFrameworkCore;
using Arms.Domain.Entities;

namespace Arms.Infrastructure
{
    public class ArmsDbContext : DbContext
    {


        public ArmsDbContext(DbContextOptions<ArmsDbContext> options)
            : base(options)
        {
        }


        public virtual DbSet<JobDescription> JobDescription { get; set; }
        public virtual DbSet<EmploymentType> employmentType { get; set; }
        public virtual DbSet<EligibilityCriteria> eligibilityCriteria { get; set; }
        public virtual DbSet<Interview> Interview { get; set; }
        public virtual DbSet<Round> Round { get; set; }
        public virtual DbSet<RoundType> RoundType { get; set; }
        public virtual DbSet<CriteriaType> CriteriaType { get; set; }
        public virtual DbSet<Loc> Loc { get; set; }
        public virtual DbSet<ApplicationStatusType> ApplicationStatusType { get; set; }
        public virtual DbSet<Skill> Skill { get; set; }
        public virtual DbSet<HrmsEmployee> Employee { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfiguration(new EmployeeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EmployeeDetailEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new JobDescriptionEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new LocEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EmploymentTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EligibilityCriteriaEntityTypeConfiguration());
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
            modelBuilder.ApplyConfiguration(new ResumeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoundEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoundTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SkillEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new HrmsEmployeeEntityTypeConfiguration());
        }
    }
}