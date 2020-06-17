using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class ApplicationStatusTypeEntityTypeConfiguration: IEntityTypeConfiguration<ApplicationStatusType>
    {
        public void Configure(EntityTypeBuilder<ApplicationStatusType> builder)
        {
            builder.ToTable("ApplicationStatusType", "ARMS");

            builder.Property(e => e.StatusName)
                .HasColumnName("statusName");

            builder.Property(e => e.Id).ValueGeneratedOnAdd();

            builder.Property(e => e.Code)
                .HasColumnName("code")
                .HasMaxLength(57)
                .HasComputedColumnSql("('CYGSTID'+CONVERT([nvarchar](50),[id]))");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .IsRequired()
                .HasColumnName("createdBy")
                .HasMaxLength(255);

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .IsRequired()
                .HasColumnName("modifiedBy")
                .HasMaxLength(255);

            builder.Property(e => e.StatusName)
                .IsRequired()
                .HasColumnName("statusName")
                .HasMaxLength(255);
        }
    }
}
