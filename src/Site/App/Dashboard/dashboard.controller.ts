module App.Dashboard {
    "use strict";

    export class DashboardController {
        static $inject: Array<string> = ["$q", "logger"];
        constructor(
            private $q: ng.IQService,
            private logger: Blocks.Logger.ILogger ) {
        }

        items: Array<{}> = [
            {
                sizeX: 1,
                sizeY: 1
            },
            {
                sizeX: 2,
                sizeY: 1
            },
            {
                sizeX: 1,
                sizeY: 2
            }
        ];
    }

    angular
        .module( "app.dashboard" )
        .controller( "DashboardController", DashboardController );
}