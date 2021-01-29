using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudySmart.Models.DataEntities;

namespace StudySmart.Models.Data.Mappings
{
    public class ClassesMap: IEntityTypeConfiguration<Classes>
    {
         public void Configure (EntityTypeBuilder<Classes> builder)
        {
            builder.HasKey(t => t.IdClass);
            builder.Property(t => t.ClassName)
            .HasColumnName("class_name")
            .IsRequired(false)
            .HasMaxLength(40);
            builder.Property(t => t.IdClass)
            .HasColumnName("id_class");
            builder.ToTable("classes");
        }
    }
}