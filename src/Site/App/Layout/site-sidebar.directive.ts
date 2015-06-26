/// <reference path="../../tools/typings/typescriptapp.d.ts" />

module App.Layout {
    "use strict";

    interface IHtSidebarScope {
        whenDoneAnimating: string;
    }

    class SiteSidebar implements ng.IDirective {
        static $inject: Array<string> = [""];
        constructor() { }

        static instance(): ng.IDirective {
            return new SiteSidebar();
        }

        bindToController: boolean = true;
        link: ( scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => void = this.linkFn;
        restrict: string = "EA";
        scope: IHtSidebarScope = {
            whenDoneAnimating: "&?"
        };

        private linkFn( scope: any, element: any, attrs: any ) {
            var $sidebarInner = element.find( ".sidebar-inner" );
            var $dropdownElement = element.find( ".sidebar-dropdown a" );
            element.addClass( "sidebar" );
            /*$dropdownElement.click( dropdown );

            function dropdown( e: any ) {
                var dropClass = 'dropy';
                e.preventDefault();
                if ( !$dropdownElement.hasClass( dropClass ) ) {
                    $sidebarInner.slideDown( 350, scope.whenDoneAnimating );
                    $dropdownElement.addClass( dropClass );
                } else if ( $dropdownElement.hasClass( dropClass ) ) {
                    $dropdownElement.removeClass( dropClass );
                    $sidebarInner.slideUp( 350, scope.whenDoneAnimating );
                }
            }*/
        }
    }

    angular
        .module( "app.layout" )
        .directive( "siteSidebar", SiteSidebar.instance );
}