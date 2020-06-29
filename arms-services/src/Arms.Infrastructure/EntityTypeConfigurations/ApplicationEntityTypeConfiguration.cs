using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class ApplicationEntityTypeConfiguration : IEntityTypeConfiguration<Application>
    {
        public void Configure(EntityTypeBuilder<Application> builder)
        {
            builder.ToTable("Application", "ARMS");

            builder.Property(e => e.Id).HasColumnName("id");

            builder.Property(e => e.ApplicationStatusTypeId).HasColumnName("applicationStatusTypeId");

            builder.Property(e => e.CandidateId).HasColumnName("candidateId");

            builder.Property(e => e.Code)
                .HasColumnName("code")
                .HasMaxLength(57)
                .HasComputedColumnSql("('CYGAPID'+CONVERT([nvarchar](50),[id]))");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .IsRequired()
                .HasColumnName("createdBy")
                .HasMaxLength(50);

            builder.Property(e => e.DateOfApplication)
                .HasColumnName("dateOfApplication")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.Education)
                .IsRequired()
                .HasColumnName("education")
                .HasMaxLength(500);

            builder.Property(e => e.Experience)
                .HasColumnName("experience")
                .HasMaxLength(50)
                .HasDefaultValueSql("((0))");

            builder.Property(e => e.JobId).HasColumnName("jobId");

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .IsRequired()
                .HasColumnName("modifiedBy")
                .HasMaxLength(50);

            builder.Property(e => e.StatusChangedAt)
                .HasColumnName("statusChangedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.HasOne(d => d.ApplicationStatusType)
                .WithMany()
                .HasForeignKey(d => d.ApplicationStatusTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApplicationStatusTypeId");

            builder.HasOne(d => d.Candidate)
                .WithMany()
                .HasForeignKey(d => d.CandidateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApplicationCandidate");

            builder.HasOne(d => d.Job)
                .WithMany()
                .HasForeignKey(d => d.JobId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApplicationJob");
           
        }
    }
}