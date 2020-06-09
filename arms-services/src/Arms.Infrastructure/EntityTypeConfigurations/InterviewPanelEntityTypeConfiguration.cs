using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class InterviewPanelEntityTypeConfiguration: IEntityTypeConfiguration<InterviewPanel>
    {
        public void Configure(EntityTypeBuilder<InterviewPanel> builder)
        {
            builder.ToTable("InterviewPanel", "ARMS");

            builder.Property(e => e.Id).HasColumnName("id");

            builder.Property(e => e.CreatedAt)
                .HasColumnName("createdAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.CreatedBy)
                .HasColumnName("createdBy")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.ModifiedAt)
                .HasColumnName("modifiedAt")
                .HasDefaultValueSql("(sysdatetime())");

            builder.Property(e => e.ModifiedBy)
                .HasColumnName("modifiedBy")
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.RoundId).HasColumnName("roundId");

            builder.HasOne(d => d.Round)
                .WithMany()
                .HasForeignKey(d => d.RoundId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_round");
        }
    }
}
