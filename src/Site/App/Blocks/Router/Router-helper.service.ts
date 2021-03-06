﻿module Blocks.Router {
    "use strict";

    export interface IRouterHelper {
        stateCounts: { errors: number; changes: number };
    }

    export class RouterHelper implements IRouterHelper {

        static $inject: Array<string> = ["$location", "$rootScope", "$state", "logger"];

        constructor(
            private $location: ng.ILocationService,
            private $rootScope: ng.IRootScopeService,
            private $state: ng.ui.IState,
            private logger: Logger.ILogger ) {
            this.handleRoutingErrors();
            this.handleStateChangeStart();
            this.handleStateChanges();
        }

        stateCounts = { errors: 0, changes: 0 };

        private handlingStateChangeError = false;

        private handleRoutingErrors() {
            this.$rootScope.$on( "$stateChangeError",
            ( event: any, toState: any, toParams: any, fromState: any, fromParams: any, error: any ) => {
                if ( this.handlingStateChangeError ) {
                    return;
                }
                this.stateCounts.errors++;
                this.handlingStateChangeError = true;
                var destination = ( toState &&
                    ( toState.title || toState.name || toState.loadedTemplateUrl ) ) ||
                    "unknown target";
                var msg = `Error routing to ${destination}. ${error.data || ""}. <br/>${error.statusText || ""}: ${error.status || ""}`;
                this.logger.warning( msg, [toState] );
                this.$location.path( "/" );
            } );
        }

        private handleStateChanges() {
            this.$rootScope.$on( "$stateChangeSuccess",
            ( event: any, toState: any, toParams: any, fromState: any, fromParams: any, error: any ) => {
                this.logger.info( `View changed to ${toState.name}` );
                this.stateCounts.changes++;
                this.handlingStateChangeError = false;
                //var title = config.docTitle + ' ' + (toState.title || '');
                //var title = ( toState.title || '' );
                //this.$rootScope.title = title; // data bind to <title>
            } );
        }

        private handleStateChangeStart() {
            this.$rootScope.$on( "$stateChangeStart", ( event: any, toState: any, toParams: any, fromState: any, fromParams: any ) => {
                //this.logger.info( `Starting state change ${fromState.name} => ${toState.name}` );
            } );
        }
    }

    angular
        .module( "blocks.router" )
        .service( "RouterHelper", RouterHelper );
}