namespace Site.Data
{
    using Dota2.SteamService;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Data.Entity;
    using Microsoft.Data.Entity.Metadata;
    using Microsoft.Data.Entity.Query;
    using Microsoft.Data.Entity.SqlServer.Metadata;

    public class ApplicationUser : IdentityUser { }

    public class MyContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Hero> Heroes { get; set; }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            var prop = modelBuilder.Entity<Hero>()
                .Property( h => h.Id );
            var gen = prop
                .Metadata.GetAnnotation( SqlServerAnnotationNames.Prefix + SqlServerAnnotationNames.ValueGeneration );
            prop.Metadata.RemoveAnnotation( gen );

            base.OnModelCreating( modelBuilder );
        }

        protected override void OnConfiguring( DbContextOptionsBuilder optionsBuilder )
        {
            base.OnConfiguring( optionsBuilder );
        }
    }
}