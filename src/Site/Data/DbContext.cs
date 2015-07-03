namespace Site.Data
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Data.Entity;
    using Microsoft.Data.Entity.Metadata.Builders;

    public class ApplicationUser : IdentityUser {}

    public class MyContext : IdentityDbContext<ApplicationUser>
    {
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
        public static EntityTypeBuilder<T> SetDahsboardTable<T>( this EntityTypeBuilder<T> entityTypeBuilder ) where T : class
        {
            var type = typeof( T );
            return entityTypeBuilder.Table( $"Dashboard_{type.Name}" );
        }
    }
}
