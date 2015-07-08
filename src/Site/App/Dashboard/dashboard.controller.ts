module App.Dashboard {
    "use strict";

    export class DashboardController {
        static $inject: Array<string> = ["$q", "logger"];
        constructor(
            private $q: ng.IQService,
            private logger: Blocks.Logger.ILogger ) {
        }
    }

    angular
        .module( "app.dashboard" )
        .controller( "DashboardController", DashboardController );
}