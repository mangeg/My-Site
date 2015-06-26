/// <reference path="../../tools/typings/typescriptapp.d.ts" />

module App.Dashboard {
    "use strict";

    configureStates.$inject = ["$stateProvider"];
    function configureStates( $stateProvider: ng.ui.IStateProvider ) {
        var states = getStates();
        states.forEach( function ( state ) {
            $stateProvider.state( state.state, state.config );
        });
    }

    function getStates() {
        return [
            {
                state: "dashboard",
                config: {
                    url: "/",
                    templateUrl: "js/app/dashboard/dashboard.html",
                    controller: "DashboardController",
                    controllerAs: "vm",
                    title: "dashboard",
                    settings: {
                        nav: 1,
                        content: "<i class=\"fa fa-dashboard\"></i> Dashboard"
                    }
                }
            }
        ];
    }

    angular
        .module( "app.dashboard" )
        .config( configureStates );
}