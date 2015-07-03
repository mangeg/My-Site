namespace Site.Controllers
{
    using System.Linq;
    using Data;
    using Microsoft.AspNet.Mvc;
    using Microsoft.Data.Entity;

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
        [Route( "{id:int}" )]
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

            match.Name = dashboard.Name;
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
        [Route( "widget/{widgetId:int}" )]
        [HttpPut]
        public void PutWidget( int widgetId, [FromBody] Widget widget )
        {
            Response.Headers.Add( "Location", new[] { "ddgdg" } );
        }
    }
}
