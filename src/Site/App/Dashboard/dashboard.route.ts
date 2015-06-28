module App.Dashboard {
    "use strict";

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
                        content: "<span class=\"glyphicon glyphicon-dashboard\"></span>Dashboard"
                    }
                }
            }
        ];
    }

    class ConfigureStates {
        static $inject = ["$stateProvider"];

        constructor( $stateProvider: ng.ui.IStateProvider ) {
            const states = getStates();
            states.forEach( state => {
                $stateProvider.state( state.state, state.config );
            });
        }
    }

    angular
        .module( "app.dashboard" )
        .config( ConfigureStates );
}