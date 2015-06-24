/// <reference path="../../../Tools/Typings/typescriptApp.d.ts"/>

module Blocks.Logger {
    export interface ILogger {
        info: ( message: string, data?: {}, title?: string ) => void;
        error: ( message: string, data?: {}, title?: string ) => void;
        success: ( message: string, data?: {}, title?: string ) => void;
        warning: ( message: string, data?: {}, title?: string ) => void;
        log: ( ...args: any[] ) => void;
    }

    export class Logger implements ILogger {
        static $inject: Array<string> = ["$log", "toastr"];

        constructor(private $log: ng.ILogService, private toastr: Toastr) {
        }

        log( ...args: any[] ) {
            this.$log.log( args );
        }

        info( message: string, data?: {}, title?: string ): void {
            this.toastr.info( message, title );
            this.$log.log( `Info: ${message}`, "\nSummary:", title, "\nDetails", data );
        }

        error( message: string, data?: {}, title?: string ): void {
            this.toastr.error( message, title );
            this.$log.log( `Error: ${message}`, "\nSummary:", title, "\nDetails", data );
        }

        success( message: string, data?: {}, title?: string ): void {
            this.toastr.success( message, title );
            this.$log.log( `Success: ${message}`, "\nSummary:", title, "\nDetails", data );
        }

        warning( message: string, data?: {}, title?: string ): void {
            this.toastr.warning( message, title );
            this.$log.log( `Warning: ${message}`, "\nSummary:", title, "\nDetails", data );
        }
    }

    angular
        .module( "blocks.logger" )
        .service( "logger", Logger );
}