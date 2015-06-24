/// <reference path="../../Tools/Typings/typescriptApp.d.ts"/>

module App.Core {
    "use strict";

    var config = {
        appErrorPrefix: "[helloworld Error] ",
        appTitle: "helloworld"
    };

    class ToastrConfig {
        static $inject = ["toastr"];

        constructor( toastr: Toastr ) {
            toastr.options.timeOut = 800;
            toastr.options.positionClass = "toast-bottom-right";
        }
    }

    class ExceptionConfigure {
        static $inject = ["$logProvider", "exceptionHandlerProvider"];

        constructor( $logProvider: ng.ILogProvider, exceptionHandlerProvider: Blocks.Exception.ExceptionHandlerProvider ) {
            if ( $logProvider.debugEnabled ) {
                $logProvider.debugEnabled( true );
            }
            exceptionHandlerProvider.configure(config.appErrorPrefix);
        }
    }

    angular
        .module( "app.core" )
        .config( ToastrConfig )
        .config( ExceptionConfigure );
}