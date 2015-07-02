namespace Site.Controllers
{
    using System.Linq;
    using Data;
    using Microsoft.AspNet.Mvc;

    [Route("api/dashboard")]
    public class DashboardController : Controller
    {
        private readonly MyContext _db;
        public DashboardController(MyContext db)
        {
            _db = db;
        }

        [Route("")]
        [HttpGet]
        public IQueryable<Dashboard> GetDashboards()
        {
            return _db.Dashboards;
        }
        [Route( "{id:int}" )]
        [HttpGet]
        public IActionResult GetDashboard(int id)
        {
            var match = _db.Dashboards.FirstOrDefault( d => d.Id == id );
            if ( match != null )
            {
                return new ObjectResult( match );
            }
            
            return HttpNotFound();
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