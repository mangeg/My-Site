namespace Site.Data
{
    using System.Collections;
    using System.Collections.Generic;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Data.Entity;
    using Microsoft.Data.Entity.Metadata;
    using Microsoft.Data.Entity.Metadata.Builders;

    public class ApplicationUser : IdentityUser {}

    public class MyContext : IdentityDbContext<ApplicationUser>
    {
        //public DbSet<Hero> Heroes { get; set; }
        public DbSet<Dashboard> Dashboards { get; set; } 
        public DbSet<Widget> Widgets { get; set; }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            //modelBuilder.Entity<Hero>().Property( h => h.Id ).Metadata.StoreGeneratedPattern = StoreGeneratedPattern.None;
            //modelBuilder.Entity<Widget>().Table( "Dashboard_Widget" );
            //modelBuilder.Entity<Dashboard>().Table( "Dashboard_Dashboard" );
            
            modelBuilder.Entity<Widget>().SetDahsboardTable();
            modelBuilder.Entity<Dashboard>().SetDahsboardTable();

            base.OnModelCreating( modelBuilder );
        }
    }

    public static class MyContextExtensions
    {
        public static EntityTypeBuilder<T> SetDahsboardTable<T>( this EntityTypeBuilder<T> entityTypeBuilder ) where T:class
        {
            var type = typeof(T);
            return entityTypeBuilder.Table( $"Dashboard_{type.Name}" );
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
