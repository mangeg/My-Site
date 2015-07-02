namespace Site.Controllers
{
    using Data;
    using Microsoft.AspNet.Mvc;

    [Route( "api/dota" )]
    public class DotaController : Controller
    {
        //private readonly IDotaService _dotaService;
        private readonly MyContext _db;
        public DotaController( /*IDotaService dotaService,*/ MyContext db )
        {
           // _dotaService = dotaService;
            _db = db;
        }
        /*
        [HttpGet]
        public IQueryable<Hero> GetHeroes()
        {
            if ( !_db.Heroes.Any() )
            {
                var allHeroes = _dotaService.GetHeroes();
                _db.Heroes.AddRange( allHeroes );
                _db.SaveChanges();
            }

            return _db.Heroes;
        }*/
    }
}