/// <reference path="../../Tools/Typings/typescriptApp.d.ts"/>

module App.Core {
    "use strict";

    angular
        .module( "app.core", [
            "blocks.exception",
            "blocks.logger",
            "blocks.router",
            "ui.router"
        ] );
}