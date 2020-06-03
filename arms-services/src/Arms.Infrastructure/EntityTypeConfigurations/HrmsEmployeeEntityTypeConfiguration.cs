using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class HrmsEmployeeEntityTypeConfiguration: IEntityTypeConfiguration<HrmsEmployee>
    {
        public void Configure(EntityTypeBuilder<HrmsEmployee> builder)
        {
            builder.ToTable("HRMS_Employee", "ARMS");

            builder.HasIndex(e => e.Email)
                .HasName("UQ__HRMS_Emp__AB6E6164719AF019")
                .IsUnique();

            builder.Property(e => e.Id).HasColumnName("id");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .HasColumnName("createdBy")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.CygCode)
                .HasColumnName("cygCode")
                .HasMaxLength(103)
                .IsUnicode(false)
                .HasComputedColumnSql("('CYG'+CONVERT([varchar](100),[id]))");

            builder.Property(e => e.Designation)
                .IsRequired()
                .HasColumnName("designation")
                .HasMaxLength(300)
                .IsUnicode(false)
                .HasDefaultValueSql("('Consultant 1')");

            builder.Property(e => e.Email)
                .IsRequired()
                .HasColumnName("email")
                .HasMaxLength(400)
                .IsUnicode(false);

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .HasColumnName("modifiedBy")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.Name)
                .IsRequired()
                .HasColumnName("name")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.Role)
                .HasColumnName("role")
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasDefaultValueSql("('Employee')");
        }

    }
}
