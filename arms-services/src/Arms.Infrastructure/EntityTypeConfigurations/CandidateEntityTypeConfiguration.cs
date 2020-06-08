using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
<<<<<<< HEAD
    internal class CandidateEntityTypeConfiguration : IEntityTypeConfiguration<Candidate>
=======
    internal class CandidateEntityTypeConfiguration: IEntityTypeConfiguration<Candidate>
>>>>>>> 2be29f0c4f54ca4f7629f009fdac4bbae995f4b2
    {
        public void Configure(EntityTypeBuilder<Candidate> builder)
        {
            builder.ToTable("Candidate", "ARMS");

            builder.HasIndex(e => e.IdentificationNo)
<<<<<<< HEAD
                .HasName("UK_Candidate")
                .IsUnique();

            builder.Property(e => e.Id).ValueGeneratedOnAdd();
=======
                .HasName("UQ__Candidat__8E2B5F48F002B100")
                .IsUnique();

            builder.Property(e => e.Id).HasColumnName("id");
>>>>>>> 2be29f0c4f54ca4f7629f009fdac4bbae995f4b2

            builder.Property(e => e.Code)
                .HasColumnName("code")
                .HasMaxLength(57)
<<<<<<< HEAD
                .IsUnicode(false)
                .HasComputedColumnSql("('CYGCDID'+CONVERT([nvarchar](57),[id]))");
=======
                .HasComputedColumnSql("('CYGCDID'+CONVERT([nvarchar](50),[id]))");
>>>>>>> 2be29f0c4f54ca4f7629f009fdac4bbae995f4b2

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
                .HasMaxLength(50);

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
<<<<<<< HEAD
                .WithMany()
                .HasForeignKey(d => d.IdProofTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CandidateIdProofType");

            builder.Property(e => e.IdProofTypeId).HasColumnName("idProofTypeId");



        }
    }
}
=======
                .WithMany(p => p.Candidate)
                .HasForeignKey(d => d.IdProofTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CandidateIdProofType");
        }
    }
}
>>>>>>> 2be29f0c4f54ca4f7629f009fdac4bbae995f4b2
