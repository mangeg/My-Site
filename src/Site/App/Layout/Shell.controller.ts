/// <reference path="../../tools/typings/typescriptapp.d.ts" />

module App.Layout {
    "use strict";

    export class ShellController {
        static $inject: Array<string> = ["$rootScope", "logger", "config"];

        constructor( private $rootScope: ng.IRootScopeService,
            private logger: Blocks.Logger.ILogger,
            private config: Core.IConfig ) {
            this.logger.success( config.appTitle + " loaded!" );
        }

        navline = {
            title: this.config.appTitle,
            text: "Created by Magnus G",
            link: "http://twitter.com/magnusgid"
        };
    }

    angular
        .module( "app.layout" )
        .controller( "ShellController", ShellController );
}