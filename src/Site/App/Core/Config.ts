/// <reference path="../../Tools/Typings/typescriptApp.d.ts"/>

module App.Core {
    "use strict";

    export interface IConfig {
        appErrorPrefix: string;
        appTitle: string;
    }

    var config = {
        appErrorPrefix: "[My-Site Error] ",
        appTitle: "My-Site"
    };

    class ToastrConfig {
        static $inject = ["toastr"];

        constructor( toastr: Toastr ) {
            toastr.options.timeOut = 4000;
            toastr.options.positionClass = "toast-bottom-right";
        }
    }

    class ExceptionConfigure {
        static $inject = ["$logProvider", "exceptionHandlerProvider"];

        constructor( $logProvider: ng.ILogProvider, exceptionHandlerProvider: Blocks.Exception.ExceptionHandlerProvider ) {
            if ( $logProvider.debugEnabled ) {
                $logProvider.debugEnabled( true );
            }
            exceptionHandlerProvider.configure( config.appErrorPrefix );
        }
    }

    angular
        .module( "app.core" )
        .config( ToastrConfig )
        .config( ExceptionConfigure )
        .value( "config", config );
}