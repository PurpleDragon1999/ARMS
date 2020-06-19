using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class ArmsEmployeeEntityTypeConfiguration : IEntityTypeConfiguration<ArmsEmployees>

    {
        public void Configure(EntityTypeBuilder<ArmsEmployees> builder)
        {
            builder.ToTable("ArmsEmployees", "dbo");


            builder.Property(e => e.DateCreated).HasColumnType("datetime");

            builder.Property(e => e.DateModified).HasColumnType("datetime");

            builder.Property(e => e.Email).HasMaxLength(1000);

            builder.Property(e => e.Experience).HasColumnType("decimal(8, 2)");

            builder.Property(e => e.HireDate).HasColumnType("date");

            builder.Property(e => e.IntacctId)
                .HasMaxLength(20)
                .IsUnicode(false);

            builder.Property(e => e.LastActivityDateUtc).HasColumnType("datetime");

            builder.Property(e => e.LastLoginDateUtc).HasColumnType("datetime");

            builder.Property(e => e.RelevantExperience).HasColumnType("decimal(8, 2)");

            builder.Property(e => e.ResumeFileName).HasMaxLength(500);

            builder.Property(e => e.Username).HasMaxLength(1000);

            builder.Property(e => e.VisibilityRmcallender).HasColumnName("VisibilityRMCallender");



        }
    }
}