namespace Site
{
    using Data;
    using Dota2.SteamService;
    using Microsoft.AspNet.Builder;
    using Microsoft.AspNet.Diagnostics;
    using Microsoft.AspNet.Hosting;
    using Microsoft.AspNet.Mvc;
    using Microsoft.Data.Entity;
    using Microsoft.Framework.ConfigurationModel;
    using Microsoft.Framework.DependencyInjection;
    using Microsoft.Framework.Logging;
    using Newtonsoft.Json.Serialization;

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
            services.AddMvc().Configure<MvcOptions>(
                options =>
                {
                    var jsonOutFormatter = options.OutputFormatters.InstanceOf<JsonOutputFormatter>();
                    jsonOutFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

                } );

            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<MyContext>(
                    d => { d.UseSqlServer( Configuration["Data:DefaultConnection:ConnectionString"] ); } );

            services.Configure<SteamServiceOptions>( Configuration.GetSubKey( "AppSettings" ) );
            services.AddTransient<IDotaService, DotaService>();
        }

        public void Configure( IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerfactory )
        {
            loggerfactory.AddConsole( LogLevel.Information );

            if ( env.IsEnvironment( "Development" ) )
            {
                //app.UseBrowserLink();
                app.UseErrorPage( ErrorPageOptions.ShowAll );
            }

            app.UseStaticFiles();

            app.UseMvc(
                routes =>
                {
                    routes.MapRoute(
                        "default",
                        "{*url}",
                        new { controller = "Home", action = "Index" } );
                } );
        }
    }
}
