using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Arms.Domain.Entities;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class JobDescriptionEntityTypeConfiguration : IEntityTypeConfiguration<JobDescription>
    {
        public void Configure(EntityTypeBuilder<JobDescription> builder)
        {
            builder.ToTable("JobDescription");
            builder.HasKey(j => j.id);
        }
    }


}
