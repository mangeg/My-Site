/// <reference path="../../../Tools/Typings/typescriptApp.d.ts"/>

module Blocks.Exception {
    "use strict";

    export interface IExceptionHandlerConfig {
        appErrorPrefix: string;
    }

    export class ExceptionHandlerProvider {
        static $inject: Array<string> = [];

        constructor() {}

        config: IExceptionHandlerConfig = {
            appErrorPrefix: undefined
        };

        configure( appErrorPrefix: any ) {
            this.config.appErrorPrefix = appErrorPrefix;
        }

        $get: () => {
            config: IExceptionHandlerConfig;
        } = () => {
            return { config: this.config };
        };
    }

    /**
     * Extend the $exceptionHandler service to also display a toast.
     * @param  {Object} $delegate
     * @param  {Object} exceptionHandler
     * @param  {Object} logger
     * @return {Function} the decorated $exceptionHandler service
     */
    function extendExceptionHandler(
        $delegate: ng.IExceptionHandlerService,
        exceptionHandler: any,
        logger: Logger.ILogger ) {
        return ( exception: any, cause: any ) => {
            //            var appErrorPrefix = '[Error] ';
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || "";
            var errorData = { exception: exception, cause: cause };
            exception.message = appErrorPrefix + exception.message;
            $delegate( exception, cause );
            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             */
            logger.error( exception.message, errorData );
        };
    }
    extendExceptionHandler.$inject = ["$delegate", "exceptionHandler", "logger"];

    class Config {
        static $inject = ["$provide"];
        constructor( $provide: ng.auto.IProvideService ) {
            $provide.decorator( "$exceptionHandler", extendExceptionHandler );
        }
    }

    angular
        .module( "blocks.exception" )
        .provider( "exceptionHandler", ExceptionHandlerProvider )
        .config( Config );

}