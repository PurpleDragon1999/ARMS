using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class ResumeEntityTypeConfiguration: IEntityTypeConfiguration<Resume>
    {
        public void Configure(EntityTypeBuilder<Resume> builder)
        {
            builder.ToTable("Resume", "ARMS");

            builder.Property(e => e.Id).HasColumnName("id");

            builder.Property(e => e.ApplicationId).HasColumnName("applicationId");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .IsRequired()
                .HasColumnName("createdBy")
                .HasMaxLength(50);

            builder.Property(e => e.Cv)
                .IsRequired()
                .HasColumnName("cv");

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .IsRequired()
                .HasColumnName("modifiedBy")
                .HasMaxLength(50);

            builder.Property(e => e.Name)
                .IsRequired()
                .HasColumnName("name")
                .HasMaxLength(50);

            builder.HasOne(d => d.Application)
                .WithMany(c=> c.Resume)
                .HasForeignKey(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ResumeApplication");
        }
    }
}
