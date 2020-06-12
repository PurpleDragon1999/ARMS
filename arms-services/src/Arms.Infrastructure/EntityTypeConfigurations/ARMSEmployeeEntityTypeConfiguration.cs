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

            builder.Property(e => e.Id).HasColumnName("Id");

            builder.Property(e => e.Name)
                .IsRequired()
                .HasColumnName("Name")
                .HasMaxLength(50);

            builder.Property(e => e.Active)
               .IsRequired()
               .HasColumnName("Active");

            builder.Property(e => e.IsSystemRole)
               .IsRequired()
               .HasColumnName("IsSystemRole");

            builder.Property(e => e.SystemName)
               .IsRequired()
               .HasColumnName("SystemName");

            builder.Property(e => e.DateCreated)
                .HasColumnName("DateCreated")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.DateModified)
                .HasColumnName("DateModified")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.RoleOrder)
                .HasColumnName("RoleOrder");

            
        }
    }
}
