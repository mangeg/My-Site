﻿/// <reference path="../tools/typings/tsd.d.ts" />

module App {
    "use strict";
    angular.module( "app", [
        "app.core",
        "app.layout",
        "app.dashboard",
        "sections.blog",
        "sections.dota"
    ] );
}