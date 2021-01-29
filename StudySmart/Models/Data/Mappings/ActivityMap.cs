using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudySmart.Models.DataEntities;

namespace StudySmart.Models.Data.Mappings
{
    public class ActivityMap : IEntityTypeConfiguration<Activities>
    {
        public void Configure (EntityTypeBuilder<Activities> builder)
        {
            builder.HasKey(t => t.IdActivity);
            builder.Property(t => t.NameActivity)
            .HasColumnName("name_activity")
            .HasMaxLength(80)
            .IsRequired();
            builder.Property(t => t.Difficulty)
            .HasColumnName("difficulty")
            .IsRequired();
            builder.Property(t => t.statusActivity)
            .HasColumnName("status_activity")
            .IsRequired();
            builder.Property(t => t.StatusConclusionDate)
            .HasColumnName("status_conclusion_date")
            .HasColumnType("bool")
            .IsRequired(false);
            builder.Property(t => t.ConclusionDate)
            .HasColumnName("conclusion_date")
            .IsRequired();
            builder.Property(t => t.ExpirationDate)
            .HasColumnName("expiration_date")
            .IsRequired();
            builder.Property(t => t.IdClass)
            .HasColumnName("id_class");
            builder.HasOne(t => t.Class)
            .WithMany(c => c.ClassActivities)
            .HasForeignKey(t => t.IdClass);
            builder.Property(t => t.IdActivity)
            .HasColumnName("id_activity");
            builder.ToTable("activities");
        }
    }
}