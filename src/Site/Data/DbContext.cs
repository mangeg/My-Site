namespace Site.Data
{
    using System.Collections;
    using System.Collections.Generic;
    using Dota2.SteamService;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Data.Entity;
    using Microsoft.Data.Entity.Metadata;

    public class ApplicationUser : IdentityUser {}

    public class MyContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Hero> Heroes { get; set; }
        public DbSet<Dashboard> Dashboards { get; set; } 
        public DbSet<Widget> Widgets { get; set; }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            modelBuilder.Entity<Hero>().Property( h => h.Id ).Metadata.StoreGeneratedPattern = StoreGeneratedPattern.None;

            base.OnModelCreating( modelBuilder );
        }
    }

    public class Dashboard
    {
        public Dashboard()
        {
            Widgets = new List<Widget>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Widget> Widgets { get; set; }
    }

    public class Widget
    {
        public int Id { get; set; }
        public int DashboardId { get; set; }
        public int ColX { get; set; }
        public int ColY { get; set; }
        public int SizeX { get; set; }
        public int SizeY { get; set; }
        public string Title { get; set; }

        public Dashboard Dashboard { get; set; }
    }
}
