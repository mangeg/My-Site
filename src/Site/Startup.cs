namespace Site
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.InteropServices;
    using System.Threading.Tasks;
    using Data;
    using Microsoft.AspNet.Builder;
    using Microsoft.AspNet.Diagnostics;
    using Microsoft.AspNet.Hosting;
    using Microsoft.AspNet.Http;
    using Microsoft.AspNet.Mvc;
    using Microsoft.AspNet.Routing;
    using Microsoft.AspNet.Routing.Constraints;
    using Microsoft.AspNet.Routing.Template;
    using Microsoft.AspNet.StaticFiles;
    using Microsoft.Data.Entity;
    using Microsoft.Framework.Configuration;
    using Microsoft.Framework.DependencyInjection;
    using Microsoft.Framework.Logging;
    using Microsoft.Framework.OptionsModel;
    using Microsoft.Framework.Runtime;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public class Startup
    {
        public Startup( IHostingEnvironment env, IApplicationEnvironment appEnv )
        {
            var config = new ConfigurationBuilder( appEnv.ApplicationBasePath )
                .AddJsonFile( "config.json" )
                .AddJsonFile( $"config.{env.EnvironmentName}.json", true );

            if ( env.IsEnvironment( "Development" ) )
            {
                config.AddUserSecrets();
            }

            Configuration = config.Build();
        }
        public IConfiguration Configuration { get; set; }
        public void ConfigureServices( IServiceCollection services )
        {
            services.AddSingleton( s => Configuration );
            services.AddMvc().Configure<MvcOptions>(
                options =>
                {
                    var jsonOutFormatter = options.OutputFormatters.OfType<JsonOutputFormatter>().First();
                    jsonOutFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    jsonOutFormatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

                } );
            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<MyContext>(
                    d =>
                    {
                        d.UseSqlServer( Configuration["Data:DefaultConnection:ConnectionString"] );
                    } );

            /*services.Configure<SteamServiceOptions>( Configuration.GetConfigurationSection( "AppSettings" ) );
            services.AddTransient<IDotaService, DotaService>();*/
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
            app.UseMiddleware<NotFoundPathMiddleware>( "/js" );
            app.UseMiddleware<NotFoundPathMiddleware>( "/content" );

            app.UseMvc(
                routes =>
                {
                    routes.MapRoute(
                        "default",
                        @"{*url}",
                        new { controller = "Home", action = "Index" } );
                } );
        }
    }

    public class NotFoundPathMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _ignore;
        public NotFoundPathMiddleware( RequestDelegate next, string ignore )
        {
            _next = next;
            _ignore = ignore;
        }

        public Task Invoke( HttpContext context )
        {
            if ( context.Request.Path.StartsWithSegments( PathString.FromUriComponent( _ignore ) ) )
            {
                context.Response.StatusCode = 404;
                return Task.FromResult( 0 );
            }
            return _next( context );
        }
    }
}
