/// <reference path="../../tools/typings/typescriptapp.d.ts" />

module App.Core {
    "use strict";

    class AppRun {
        static $inject = ["RouterHelper"];

        constructor( routerHelper: Blocks.Router.IRouterHelper ) {}
    }

    class ConfigureStates {
        static $inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];

        constructor(
            $stateProvider: ng.ui.IStateProvider,
            $locationProvider: ng.ILocationProvider,
            $urlRouterProvider: ng.ui.IUrlRouterProvider ) {
            var otherwise = "/404";
            var states = [
                {
                    state: "404",
                    config: {
                        url: "/404",
                        templateUrl: "js/app/core/404.html",
                        title: "404"
                    }
                }
            ];
            states.forEach( state => {
                $stateProvider.state( state.state, state.config );
            } );
            $locationProvider.html5Mode( true );
            $urlRouterProvider.otherwise( otherwise );
        }
    }

    angular
        .module( "app.core" )
        .config( ConfigureStates )
        .run( AppRun );
}