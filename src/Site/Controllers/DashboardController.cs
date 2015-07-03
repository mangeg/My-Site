namespace Site.Controllers
{
    using System.Linq;
    using Data;
    using Microsoft.AspNet.Mvc;
    using Microsoft.Data.Entity;
    using Microsoft.Data.Entity.ChangeTracking;
    using Microsoft.Data.Entity.Metadata;
    using Microsoft.Data.Entity.Query;
    using Remotion.Linq.Clauses;

    [Route( "api/dashboard" )]
    public class DashboardController : Controller
    {
        private readonly MyContext _db;
        public DashboardController( MyContext db )
        {
            _db = db;
            //_db.Database.EnsureDeleted();
            //_db.Database.EnsureCreated();
        }

        [Route( "" )]
        [HttpGet]
        public IQueryable<Dashboard> GetDashboards()
        {
            return _db.Dashboards;
        }
        [Route( "{id:int}", Name = "GetDashboard")]
        [HttpGet]
        public IActionResult GetDashboard( int id )
        {
            var match = _db.Dashboards.Include( e => e.Widgets ).FirstOrDefault( d => d.Id == id );
            if ( match != null )
            {
                return new ObjectResult( match );
            }

            return HttpNotFound();
        }
        [Route( "" )]
        [HttpPost]
        public IActionResult CreateDashboard( [FromBody] Dashboard dashboard )
        {
            if ( dashboard == null )
            {
                return new BadRequestResult();
            }

            _db.Add( dashboard );
            _db.SaveChanges();

            Response.Headers.Append( "Location", Url.Link( "GetDashboard", new { id = dashboard.Id } ) );

            return new NoContentResult();
        }
        [Route("{id:int}")]
        [HttpPut]
        public IActionResult UpdateDashboard( int id, [FromBody] Dashboard dashboard )
        {
            var match = _db.Dashboards.FirstOrDefault( d => d.Id == id );
            if ( match == null )
            {
                return new HttpNotFoundResult();
            }

            _db.Entry( match ).Update( dashboard );
            _db.SaveChanges();

            return new NoContentResult();
        }
        [Route( "{id:int}" )]
        [HttpDelete]
        public IActionResult DeleteDashboard( int id )
        {
            var match = _db.Dashboards.FirstOrDefault( d => d.Id == id );
            if ( match == null )
            {
                return HttpNotFound();
            }

            _db.Remove( match );
            _db.SaveChanges();

            return new NoContentResult();
        }


        [Route( "{dashboardId:int}/widgets" )]
        [HttpGet]
        public IActionResult GetWidgets( int dashboardId )
        {
            if ( !_db.Dashboards.Any( d => d.Id == dashboardId ) )
            {
                return HttpNotFound();
            }
            return new ObjectResult( _db.Widgets.Where( w => w.DashboardId == dashboardId ) );
        }
        [Route("widget/{id:int}", Name = "GetWidget")]
        [HttpGet]
        public IActionResult GetWidget( int id )
        {
            var match = _db.Widgets.FirstOrDefault( w => w.Id == id );
            if ( match == null )
            {
                return HttpNotFound();
            }

            return new ObjectResult( match );
        }
        [Route("widget")]
        [HttpPost]
        public IActionResult CreateWidget( [FromBody] Widget widget )
        {
            if ( widget.DashboardId <= 0 )
            {
                return new BadRequestResult();
            }

            return CreateWidget( widget.DashboardId, widget );
        }
        [Route("{widgetId:int}/widget")]
        [HttpPost]
        public IActionResult CreateWidget( int dashboardId, [FromBody] Widget widget )
        {
            if ( string.IsNullOrWhiteSpace( widget.Title ) )
            {
                return new BadRequestObjectResult( "Title is required" );
            }

            var dashboard = _db.Dashboards.FirstOrDefault( d => d.Id == dashboardId );
            if ( dashboard == null )
            {
                return HttpNotFound( "Dashboard not found" );
            }

            widget.Id = 0;
            widget.DashboardId = dashboardId;

            _db.Add( widget );
            _db.SaveChanges();

            var location = Url.Link( "GetWidget", new { id = widget.Id } );
            Response.Headers.Append( "Location", location );

            return new NoContentResult();
        }
        [Route( "widget/{id:int}" )]
        [HttpPut]
        public IActionResult PutWidget( int id, [FromBody] Widget widget )
        {
            var match = _db.Widgets.FirstOrDefault( w => w.Id == id );
            if ( match == null )
            {
                return new HttpNotFoundResult();
            }

            widget.Id = id;
            _db.Entry( match ).Update( widget );
            
            _db.SaveChanges();

            return new NoContentResult();
        }
        [Route("widget/{id:int}")]
        [HttpDelete]
        public IActionResult DeleteWidget( int id )
        {
            var match = _db.Widgets.FirstOrDefault( w => w.Id == id );
            if ( match == null )
            {
                return new HttpNotFoundResult();
            }

            _db.Remove( match );
            _db.SaveChanges();

            return new NoContentResult();
        }
    }

    public static class EntityExtensions
    {
        public static EntityEntry<T> Update<T>( this EntityEntry<T> entity, T other ) where T : class
        {
            var props = entity.Metadata.GetProperties();
            foreach ( var prop in props )
            {
                if ( prop.StoreGeneratedPattern == StoreGeneratedPattern.Computed || prop.StoreGeneratedPattern == StoreGeneratedPattern.Identity )
                    continue;

                var val = entity.Context.Entry( other ).Property( prop.Name ).CurrentValue;
                entity.Property( prop.Name ).CurrentValue = val;
                entity.Property( prop.Name ).IsModified = true;
            }
            return entity;
        }
    }
}
