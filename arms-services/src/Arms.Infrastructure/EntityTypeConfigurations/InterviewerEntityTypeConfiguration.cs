using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class InterviewerEntityTypeConfiguration: IEntityTypeConfiguration<Interviewer>
    {
        public void Configure(EntityTypeBuilder<Interviewer> builder)
        {
            builder.ToTable("Interviewer", "ARMS");

            builder.Property(e => e.Id).HasColumnName("id");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .HasColumnName("createdBy")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.EmployeeId).HasColumnName("employeeId");

            builder.Property(e => e.InterviewPanelId).HasColumnName("interviewPanelId");

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .HasColumnName("modifiedBy")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.HasOne(d => d.InterviewPanel)
                .WithMany()
                .HasForeignKey(d => d.InterviewPanelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_interviewPanel");

        }
    }
}
