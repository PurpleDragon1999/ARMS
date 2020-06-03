using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class LocationEntityTypeConfiguration: IEntityTypeConfiguration<Location>
    {
        public void Configure(EntityTypeBuilder<Location> builder)
        {
            builder.ToTable("Location", "ARMS");

            builder.Property(e => e.Id).HasColumnName("id");

            builder.Property(e => e.Code)
                .IsRequired()
                .HasColumnName("code")
                .HasMaxLength(57)
                .IsUnicode(false)
                .HasComputedColumnSql("('CYGLCID'+CONVERT([varchar](50),[id]))");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .IsRequired()
                .HasColumnName("createdBy")
                .HasMaxLength(255)
                .IsUnicode(false);

            builder.Property(e => e.JobId).HasColumnName("jobId");

            builder.Property(e => e.LocationName)
                .IsRequired()
                .HasColumnName("locationName")
                .HasMaxLength(255)
                .IsUnicode(false);

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .IsRequired()
                .HasColumnName("modifiedBy")
                .HasMaxLength(255)
                .IsUnicode(false);

            builder.HasOne(d => d.Job)
                .WithMany(p => p.LocationNavigation)
                .HasForeignKey(d => d.JobId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LC_JobId");
        }
    }
}
