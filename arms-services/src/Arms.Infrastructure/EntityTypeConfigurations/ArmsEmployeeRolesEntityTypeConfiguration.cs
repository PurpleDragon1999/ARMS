using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class ArmsEmployeeRolesEntityTypeConfiguration : IEntityTypeConfiguration<ArmsEmployeeRoles>

    {
        public void Configure(EntityTypeBuilder<ArmsEmployeeRoles> builder)
        {
            builder.ToTable("ArmsEmployeeRoles", "HRMS");

            builder.Property(e => e.DateCreated).HasColumnType("datetime");

            builder.Property(e => e.DateModified).HasColumnType("datetime");

            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(e => e.SystemName).HasMaxLength(255);






        }
    }
}