module Sections.Dota {
    "user strict";

    function getStates() {
        return [
            {
                state: "dota",
                config: {
                    url: "/dota",
                    templateUrl: "js/app/sections/dota/dota.html",
                    controller: "DotaController",
                    controllerAs: "vm",
                    title: "dota",
                    settings: {
                        nav: 3,
                        content: "<i class=\"fa fa-cube\"></i>Dota"
                    }
                }
            }
        ];
    }

    class RouteConfig {
        static $inject: Array<string> = ["$stateProvider"];
        constructor( $stateProvider: ng.ui.IStateProvider ) {
            const states = getStates();
            states.forEach( state => {
                $stateProvider.state( state.state, state.config );
            });
        }
    }

    angular
        .module( "sections.dota" )
        .config( RouteConfig );
}