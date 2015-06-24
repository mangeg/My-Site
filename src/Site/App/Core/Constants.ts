/// <reference path="../../Tools/Typings/typescriptApp.d.ts"/>

module App.Core {
    "user strict";

    angular
        .module( "app.core" )
        .constant( "toastr", toastr );
}