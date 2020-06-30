using System;


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
        public virtual DbSet<Application> Application { get; set; }
        public virtual DbSet<Resume> Resume { get; set; }
        public virtual DbSet<ApplicationStatusType> ApplicationStatusType { get; set; }
        public virtual DbSet<JobDescription> JobDescription { get; set; }
        public virtual DbSet<EmploymentType> employmentType  { get; set; }

        public virtual DbSet<EligibilityCriteria> eligibilityCriteria { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<EmployeeDetail> EmployeeDetail { get; set; }
        public virtual DbSet<Criteria> Criteria { get; set; }


        public virtual DbSet<Interview> Interview { get; set; }
        public virtual DbSet<Round> Round { get; set; }
        public virtual DbSet<RoundType> RoundType { get; set; }
        public virtual DbSet<CriteriaType> CriteriaType { get; set; }
        public virtual DbSet<Loc> Loc { get; set; }
        public virtual DbSet<Skill> Skill { get; set; }
        public virtual DbSet<Images> Images { get; set; }
        public virtual DbSet<Interviewer> Interviewer { get; set; }
        public virtual DbSet<InterviewPanel> InterviewPanel { get; set; }
        public virtual DbSet<ArmsEmployees> ArmsEmployees { get; set; }
        public virtual DbSet<ArmsEmployeeRoles> ArmsEmployeeRoles { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CandidateEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new IdProofTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ResumeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationStatusTypeEntityTypeConfiguration());
            //modelBuilder.ApplyConfiguration(new EmployeeEntityTypeConfiguration());
            //modelBuilder.ApplyConfiguration(new EmployeeDetailEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new JobDescriptionEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new LocEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EmploymentTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EligibilityCriteriaEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationStatusTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoundTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new AssessmentEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CriteriaEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CriteriaTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ImagesEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new InterviewEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new InterviewerEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new InterviewPanelEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoundEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoundTypeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SkillEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ArmsEmployeeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ArmsEmployeeRolesEntityTypeConfiguration());
        }
    }
}