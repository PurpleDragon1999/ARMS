using System;
using System.Collections.Generic;
using System.Text;
using Arms.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Arms.Infrastructure.EntityTypeConfigurations
{
    internal class EmployeeEntityTypeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.ToTable("Employee", "ARMS");

            builder.Property(e => e.Id).HasColumnName("Id");

            builder.Property(e => e.UserGuid)
            .IsRequired()
            .HasColumnName("UserGuid");

            builder.Property(e => e.FirstName)
              .HasColumnName("FirstName");

            builder.Property(e => e.LastName)
              .HasColumnName("LastName");

            builder.Property(e => e.Username)
             .HasColumnName("Username");

            builder.Property(e => e.Email)
               .HasColumnName("Email");

            builder.Property(e => e.Password)
               .HasColumnName("Password");

            builder.Property(e => e.PasswordFormatId)
               .IsRequired()
               .HasColumnName("PasswordFormatId");

            builder.Property(e => e.PasswordSalt)
              .HasColumnName("PasswordSalt");

            builder.Property(e => e.LocationId)
              .HasColumnName("LocationId");

            builder.Property(e => e.Deleted)
              .IsRequired()
              .HasColumnName("Deleted");

            builder.Property(e => e.DivisionId)
              .HasColumnName("DivisionId");

            builder.Property(e => e.HireDate)
             .HasColumnName("HireDate");

            builder.Property(e => e.Active)
               .IsRequired()
               .HasColumnName("Active");

            builder.Property(e => e.SystemName)
              .IsRequired()
              .HasColumnName("SystemName");

            builder.Property(e => e.LastLoginDateUtc)
            .HasColumnName("LastLoginDateUtc");

            builder.Property(e => e.Location)
              .IsRequired()
              .HasColumnName("Location");



        }
    }
}