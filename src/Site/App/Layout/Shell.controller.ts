/// <reference path="../../tools/typings/typescriptapp.d.ts" />

module App.Layout {
    "use strict";

    export class ShellController {
        static $inject: Array<string> = ["$rootScope", "logger", "config"];

        constructor( private $rootScope: ng.IRootScopeService,
            private logger: Blocks.Logger.ILogger,
            private config: App.Core.IConfig ) {
            this.logger.success( config.appTitle + " loaded!" );
        }
    }

    angular
        .module( "app.layout" )
        .controller( "ShellController", ShellController );
}