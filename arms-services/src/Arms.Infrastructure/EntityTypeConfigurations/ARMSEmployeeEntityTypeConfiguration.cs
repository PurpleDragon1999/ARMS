using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class ARMSEmployeeEntityTypeConfiguration : IEntityTypeConfiguration<ARMSEmployee>
    {
        public void Configure(EntityTypeBuilder<ARMSEmployee> builder)
        {
            builder.ToTable("ARMSEmployee", "ARMS");

            builder.Property(e => e.Id).HasColumnName("id");

            builder.Property(e => e.Name)
                .IsRequired()
                .HasColumnName("name")
                .HasMaxLength(50);

            builder.Property(e => e.Email)
               .IsRequired()
               .HasColumnName("email")
               .HasMaxLength(50);

            builder.Property(e => e.Designation)
               .IsRequired()
               .HasColumnName("designation")
               .HasMaxLength(50);

            builder.Property(e => e.Role)
               .IsRequired()
               .HasColumnName("role")
               .HasMaxLength(50);

            builder.Property(e => e.Code)
                .HasColumnName("code")
                .HasMaxLength(106)
                .IsUnicode(false)
                .HasComputedColumnSql("('CYGIID'+CONVERT([varchar](100),[id]))");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .HasColumnName("createdBy")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .HasColumnName("modifiedBy")
                .HasMaxLength(50)
                .IsUnicode(false);
        }
    }
}
