<<<<<<< HEAD
﻿using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class CriteriaTypeEntityTypeConfiguration : IEntityTypeConfiguration<CriteriaType>
    {
        

=======
﻿using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class CriteriaTypeEntityTypeConfiguration: IEntityTypeConfiguration<CriteriaType>
    {
>>>>>>> 930b9d55e51770ff045d5bdda7a3b350795888e3
        public void Configure(EntityTypeBuilder<CriteriaType> builder)
        {
            builder.ToTable("CriteriaType", "ARMS");

<<<<<<< HEAD

            builder.Property(e => e.id).HasColumnName("id");

            builder.Property(e => e.code)
=======
            builder.HasIndex(e => e.CriteriaName)
                .HasName("UQ__Criteria__DDFF34753EA5F096")
                .IsUnique();

            builder.Property(e => e.Id).HasColumnName("id");

            builder.Property(e => e.Code)
>>>>>>> 930b9d55e51770ff045d5bdda7a3b350795888e3
                .IsRequired()
                .HasColumnName("code")
                .HasMaxLength(57)
                .IsUnicode(false)
                .HasComputedColumnSql("('CYGCTID'+CONVERT([varchar](50),[id]))");

<<<<<<< HEAD
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

        
=======
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
>>>>>>> 930b9d55e51770ff045d5bdda7a3b350795888e3
    }
}
