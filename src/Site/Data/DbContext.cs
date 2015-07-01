namespace Site.Data
{
    using Dota2.SteamService;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Data.Entity;
    using Microsoft.Data.Entity.Metadata;

    public class ApplicationUser : IdentityUser {}

    public class MyContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Hero> Heroes { get; set; }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            modelBuilder.Entity<Hero>().Property( h => h.Id ).Metadata.StoreGeneratedPattern = StoreGeneratedPattern.None;

            base.OnModelCreating( modelBuilder );
        }
    }
}
