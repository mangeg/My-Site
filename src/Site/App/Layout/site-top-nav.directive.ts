/// <reference path="../../tools/typings/typescriptapp.d.ts" />

module App.Layout {
    "use strict";

    interface IHtTopNavScope {
        navline: string;
    }

    class SiteTopNav implements ng.IDirective {
        static $inject: Array<string> = [""];

        constructor() {}

        static instance(): ng.IDirective {
            return new SiteTopNav();
        }

        bindToController = true;
        controller = TopNavController;
        controllerAs = "vm";
        restrict = "EA";
        scope: IHtTopNavScope = {
            navline: "="
        };
        link: ( scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => void;
        templateUrl = "js/app/layout/site-top-nav.html";
    }

    class TopNavController {
        constructor() {}
    }

    angular
        .module( "app.layout" )
        .directive( "siteTopNav", SiteTopNav.instance );
}