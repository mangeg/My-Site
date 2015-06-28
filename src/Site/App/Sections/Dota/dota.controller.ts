module Sections.Dota {
    "use strict";

    interface IDotaHero {
        id: number;
        name: string;
        imageName: string;
        localizedName: string;
        imagePathSmallHorizontalPortrait: string;
        imagePathLargeHorizontalPortrait: string;
        imagePathFullHorizontalPortrait: string;
        imagePathFullVerticalPortrait: string;
    }

    class DotaController {
        static $inject: Array<string> = ["$http", "$q"];

        constructor( $http: ng.IHttpService, private $q: ng.IQService ) {
            $http.get( "/api/dota" )
                .then( ( data ) => {
                    this.heroes = <Array<IDotaHero>>data.data;
                    this.filterChanged();
                } );
        }

        heroFilter = "";
        heroes: Array<IDotaHero>;
        filtereddHeros: Array<IDotaHero>;

        filterChanged() {
            var def = this.$q.defer();

            setTimeout( () => {
                def.resolve( this.getFilteredHeroes() );
            }, 1 );

            def.promise.then( ( h: Array<IDotaHero> ) => {
                this.filtereddHeros = h.slice( 0, 15 );
            } );

            return def.promise;
        }

        getFilteredHeroes() {
            return this.heroes.filter( h => {
                if ( this.heroFilter.length === 0 ) {
                    return true;
                }
                var regex = new RegExp( this.heroFilter, "i" );
                if ( regex.test( h.localizedName ) ) {
                    return true;
                }
                return false;
            });
        }
    }

    angular
        .module( "sections.dota" )
        .controller( "DotaController", DotaController );
}