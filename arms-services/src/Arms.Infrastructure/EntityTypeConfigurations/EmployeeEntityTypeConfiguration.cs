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
            /*
            builder.HasKey(m => m.Id);
            builder.Property(m => m.LocationId).HasColumnName("Location");

            builder.HasOne(o => o.EmployeeDetail)
                .WithMany()
                .HasForeignKey(m => m.EmployeeDetailId);*/
        }
    }
}