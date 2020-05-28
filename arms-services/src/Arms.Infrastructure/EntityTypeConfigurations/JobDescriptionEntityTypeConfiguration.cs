using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class JobDescriptionEntityTypeConfiguration: IEntityTypeConfiguration<JobDescription>
    {
        public void Configure(EntityTypeBuilder<JobDescription> builder)
        {
            builder.ToTable("JobDescription", "ARMS");

            builder.HasIndex(e => e.JobTitle)
                .HasName("UQ__JobDescr__151D087A2951D1F8")
                .IsUnique();

            builder.Property(e => e.Id).HasColumnName("id");

            builder.Property(e => e.ClosingDate).HasColumnName("closingDate");

            builder.Property(e => e.Code)
                .HasColumnName("code")
                .HasMaxLength(106)
                .IsUnicode(false)
                .HasComputedColumnSql("('CYGJID'+CONVERT([varchar](100),[id]))");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .HasColumnName("createdBy")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.Description)
                .IsRequired()
                .HasColumnName("description");

            builder.Property(e => e.JobTitle)
                .IsRequired()
                .HasColumnName("jobTitle")
                .HasMaxLength(60)
                .IsUnicode(false);

            builder.Property(e => e.Location)
                .IsRequired()
                .HasColumnName("location")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .HasColumnName("modifiedBy")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.OpeningDate).HasColumnName("openingDate");

            builder.Property(e => e.PdfBlobData).HasColumnName("pdfBlobData");

            builder.Property(e => e.Salary).HasColumnName("salary");

            builder.Property(e => e.Vacancies).HasColumnName("vacancies");
        }
    }
}
