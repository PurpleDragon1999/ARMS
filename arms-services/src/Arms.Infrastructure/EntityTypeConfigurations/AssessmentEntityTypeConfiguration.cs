using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class AssessmentEntityTypeConfiguration : IEntityTypeConfiguration<Assessment>
    {
        public void Configure(EntityTypeBuilder<Assessment> builder)
        {
            builder.ToTable("Assessment", "ARMS");

            builder.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            

            builder.Property(e => e.ApplicationId).HasColumnName("applicationId");

            builder.Property(e => e.Code)
                .HasColumnName("code")
                .HasMaxLength(56)
                .HasComputedColumnSql("('CYGAID'+CONVERT([nvarchar](50),[id]))");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .HasColumnName("createdBy")
                .HasMaxLength(255)
                .IsUnicode(false);

            builder.Property(e => e.Feedback)
                .IsRequired()
                .HasColumnName("feedback");

            builder.Property(e => e.InterviewPanelId).HasColumnName("interviewPanelId");

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .HasColumnName("modifiedBy")
                .HasMaxLength(255)
                .IsUnicode(false);

            builder.Property(e => e.Result)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.RoundId).HasColumnName("roundId");

            builder.HasOne(d => d.Application)
                .WithMany(p => p.Assessment)
                .HasForeignKey(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Assessment_ArmsApplication");

            builder.HasOne(d => d.InterviewPanel)
                .WithMany()
                .HasForeignKey(d => d.InterviewPanelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Assessment_ArmsInterviewPanel");

            builder.HasOne(d => d.Round)
                .WithMany()
                .HasForeignKey(d => d.RoundId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Assessment_ArmsRound");
        }
    }
}