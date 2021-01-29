using StudySmart.Models.DataEntities;
using Microsoft.EntityFrameworkCore;
using StudySmart.Models.Data.Mappings;

namespace StudySmart.Models.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }
        public DbSet<Activities> ActivitiesDB { get; set; }
        public DbSet<Classes> ClassesDB { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ActivityMap());
            modelBuilder.ApplyConfiguration(new ClassesMap());
        }

    }
}