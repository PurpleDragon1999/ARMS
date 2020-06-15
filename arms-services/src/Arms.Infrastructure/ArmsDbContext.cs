using Arms.Domain.Entities;
using Arms.Infrastructure.EntityTypeConfigurations;
using Microsoft.EntityFrameworkCore;

namespace Arms.Infrastructure
{
    public class ArmsDbContext : DbContext
    {
<<<<<<< HEAD
=======


>>>>>>> 8ad20b2116d97fef9d1d2b1976155e743fc62d50
        public ArmsDbContext(DbContextOptions<ArmsDbContext> options)
            : base(options)
        {
        }
<<<<<<< HEAD
        public DbSet<ARMSEmployeeRoles> ARMSEmployeeRoles { get; set; }
        public DbSet<Employee>Employee { get; set; }
=======


>>>>>>> 8ad20b2116d97fef9d1d2b1976155e743fc62d50
        public virtual DbSet<JobDescription> JobDescription { get; set; }
        public virtual DbSet<EmploymentType> employmentType { get; set; }
        public virtual DbSet<EligibilityCriteria> eligibilityCriteria { get; set; }
        public virtual DbSet<Interview> Interview { get; set; }
        public virtual DbSet<Round> Round { get; set; }
        public virtual DbSet<RoundType> RoundType { get; set; }
        public virtual DbSet<CriteriaType> CriteriaType { get; set; }
<<<<<<< HEAD
        public virtual DbSet<Location> Loc { get; set; }
        public virtual DbSet<ApplicationStatusType> ApplicationStatusType { get; set; }
        public virtual DbSet<Skill> Skill { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
=======
        public virtual DbSet<Loc> Loc { get; set; }
        public virtual DbSet<ApplicationStatusType> ApplicationStatusType { get; set; }
        public virtual DbSet<Skill> Skill { get; set; }
        public virtual DbSet<HrmsEmployee> Employee { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

>>>>>>> 8ad20b2116d97fef9d1d2b1976155e743fc62d50
            modelBuilder.ApplyConfiguration(new EmployeeEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ARMSEmployeeRolesEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EmployeeDetailEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new JobDescriptionEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new LocationEntityTypeConfiguration());
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
<<<<<<< HEAD

=======
            modelBuilder.ApplyConfiguration(new HrmsEmployeeEntityTypeConfiguration());
>>>>>>> 8ad20b2116d97fef9d1d2b1976155e743fc62d50
        }
    }
}