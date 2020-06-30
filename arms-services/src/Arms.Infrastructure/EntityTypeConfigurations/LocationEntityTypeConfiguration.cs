using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class LocationEntityTypeConfiguration : IEntityTypeConfiguration<Location>
    {
        public void Configure(EntityTypeBuilder<Location> builder)
        {

            builder.ToTable("Location", "ARMS");
            builder.Property(e => e.id).HasColumnName("id");

            //builder.Property(e => e.id).ValueGeneratedOnAdd();
            builder.Property(e => e.code)
                .IsRequired()
                .HasColumnName("code")
                .HasMaxLength(57)
                .IsUnicode(false)
                .HasComputedColumnSql("('CYGLCID'+CONVERT([varchar](50),[id]))");

            builder.Property(e => e.createdAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.createdBy)
                .IsRequired()
                .HasColumnName("createdBy")
                .HasMaxLength(255)
                .IsUnicode(false);

            builder.Property(e => e.locationName)
                .IsRequired()
                .HasColumnName("locationName")
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
        }
    }
}

