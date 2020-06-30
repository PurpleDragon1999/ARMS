using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class RoundEntityTypeConfiguration : IEntityTypeConfiguration<Round>
    {
        public void Configure(EntityTypeBuilder<Round> builder)
        {
            builder.ToTable("Round", "ARMS");

            builder.Property(e => e.Id).HasColumnName("id");
            builder.Property(e => e.RoundNumber).HasColumnName("roundNumber");
            builder.Property(e => e.RoundDate).HasColumnName("roundDate");
            builder.Property(e => e.RoundTime).HasColumnName("roundTime");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .HasColumnName("createdBy")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.InterviewId).HasColumnName("interviewId");

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .HasColumnName("modifiedBy")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.RoundTypeId).HasColumnName("roundTypeId");

            builder.HasOne(d => d.Interview)
                .WithMany()
                .HasForeignKey(d => d.InterviewId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Interview");


            builder.HasOne(d => d.RoundType)
                .WithMany()
                .HasForeignKey(d => d.RoundTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_roundType");

        }
    }

}
