using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class CriteriaTypeEntityTypeConfiguration: IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.ToTable("CriteriaType", "ARMS");

            builder.HasIndex(e => e.CriteriaName)
                .HasName("UQ__Criteria__DDFF34753EA5F096")
                .IsUnique();

            builder.Property(e => e.Id).HasColumnName("id");

            builder.Property(e => e.Code)
                .IsRequired()
                .HasColumnName("code")
                .HasMaxLength(57)
                .IsUnicode(false)
                .HasComputedColumnSql("('CYGCTID'+CONVERT([varchar](50),[id]))");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .IsRequired()
                .HasColumnName("createdBy")
                .HasMaxLength(255);

            builder.Property(e => e.CriteriaName)
                .IsRequired()
                .HasColumnName("criteriaName")
                .HasMaxLength(255);

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .IsRequired()
                .HasColumnName("modifiedBy")
                .HasMaxLength(255);

            builder.Property(e => e.RoundTypeId).HasColumnName("roundTypeId");

            builder.HasOne(d => d.RoundType)
                .WithMany(p => p.CriteriaType)
                .HasForeignKey(d => d.RoundTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CT_ArmsRoundType");
        }
    }
}
