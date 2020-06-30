using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class CriteriaTypeEntityTypeConfiguration : IEntityTypeConfiguration<CriteriaType>
    {


        public void Configure(EntityTypeBuilder<CriteriaType> builder)
        {
            builder.ToTable("CriteriaType", "ARMS");

            builder.Property(e => e.id).HasColumnName("id");

            builder.Property(e => e.code)
               .HasColumnName("code")
                 .HasMaxLength(106)
                .IsUnicode(false)
                .HasComputedColumnSql("('CYGCTID'+CONVERT([varchar](100),[id]))"); ;

            builder.Property(e => e.criteriaName)
                .IsRequired()
                .HasColumnName("criteriaName")
                .HasMaxLength(255)
                .IsUnicode(false);

            builder.Property(e => e.createdAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.createdBy)
                .IsRequired()
                .HasColumnName("createdBy")
                .HasMaxLength(255)
                .IsUnicode(false);

            builder.Property(e => e.modifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.modifiedBy)
                .IsRequired()
                .HasColumnName("modifiedBy")
                .HasMaxLength(255)
                .IsUnicode(false);

        
            
            builder.HasOne(d => d.roundType)
              .WithMany()
              .HasForeignKey(d => d.roundTypeId)
              .OnDelete(DeleteBehavior.ClientSetNull)
              .HasConstraintName("FK_CT_ArmsRoundType");

        }



    }
}
