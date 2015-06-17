namespace Site
{
    using Microsoft.AspNet.Builder;
    using Microsoft.AspNet.Hosting;
    using Microsoft.AspNet.Http;
    using Microsoft.Framework.ConfigurationModel;
    using Microsoft.Framework.DependencyInjection;

    public class Startup
    {
        public Startup( IHostingEnvironment env )
        {
            var config = new Configuration()
                .AddJsonFile( "config.json" )
                .AddJsonFile( $"config.{env.EnvironmentName}.json", true );

            if ( env.IsEnvironment( "Development" ) )
            {
                config.AddUserSecrets();
            }

            Configuration = config;
        }
        public IConfiguration Configuration { get; set; }
        public void ConfigureServices( IServiceCollection services )
        {
            services.AddSingleton( s => Configuration );
        }

        public void Configure( IApplicationBuilder app )
        {
            app.Run( async ( context ) => { await context.Response.WriteAsync( "Hello World!" ); } );
        }
    }
}
