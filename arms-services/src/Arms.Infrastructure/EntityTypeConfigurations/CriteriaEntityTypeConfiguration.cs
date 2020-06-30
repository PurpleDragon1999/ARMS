using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class CriteriaEntityTypeConfiguration: IEntityTypeConfiguration<Criteria>
    {
        public void Configure(EntityTypeBuilder<Criteria> builder)
        {
            builder.ToTable("Criteria", "ARMS");

            builder.Property(e => e.Id).HasColumnName("id");

            builder.Property(e => e.AssessmentId).HasColumnName("assessmentId");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasColumnType("datetime")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .HasColumnName("createdBy")
                .HasMaxLength(255)
                .IsUnicode(false);

            builder.Property(e => e.CriteriaTypeId).HasColumnName("criteriaTypeId");

            builder.Property(e => e.Marks).HasColumnName("marks");

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasColumnType("datetime")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .HasColumnName("modifiedBy")
                .HasMaxLength(255)
                .IsUnicode(false);

            builder.Property(e => e.Remarks)
                .IsRequired()
                .HasColumnName("remarks");

            builder.HasOne(d => d.Assessment)
                .WithMany(x => x.Criteria)
                .HasForeignKey(d => d.AssessmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CR_ArmsAssessment");

          
            builder.HasOne(d => d.CriteriaType)
                .WithMany()
                .HasForeignKey(d => d.CriteriaTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CR_ArmsCriteriaType");
        }
    }
}
