using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class CandidateEntityTypeConfiguration : IEntityTypeConfiguration<Candidate>
    {
        public void Configure(EntityTypeBuilder<Candidate> builder)
        {
            builder.ToTable("Candidate", "ARMS");

            builder.HasIndex(e => e.IdentificationNo)
                .HasName("UK_Candidate")
                .IsUnique();

            builder.Property(e => e.Id).ValueGeneratedOnAdd();

            builder.Property(e => e.Code)
                .HasColumnName("code")
                .HasMaxLength(57)
                .IsUnicode(false)
                .HasComputedColumnSql("('CYGCDID'+CONVERT([nvarchar](57),[id]))");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .IsRequired()
                .HasColumnName("createdBy")
                .HasMaxLength(50);

            builder.Property(e => e.Email)
                .IsRequired()
                .HasColumnName("email")
                .HasMaxLength(50);

            builder.Property(e => e.IdProofTypeId).HasColumnName("idProofTypeId");

            builder.Property(e => e.IdentificationNo)
                .IsRequired()
                .HasColumnName("identificationNo")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .IsRequired()
                .HasColumnName("modifiedBy")
                .HasMaxLength(50);

            builder.Property(e => e.Name)
                .IsRequired()
                .HasColumnName("name")
                .HasMaxLength(50);

            builder.Property(e => e.Phone)
                .IsRequired()
                .HasColumnName("phone")
                .HasMaxLength(22);

            builder.HasOne(d => d.IdProofType)
                .WithMany()
                .HasForeignKey(d => d.IdProofTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CandidateIdProofType");

            builder.Property(e => e.IdProofTypeId).HasColumnName("idProofTypeId");



        }
    }
}