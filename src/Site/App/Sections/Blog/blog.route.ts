module Sections.Blog {
    "use strict";

    function getStates() {
        return [
            {
                state: "blog",
                config: {
                    url: "/blog",
                    templateUrl: "js/app/sections/blog/blog.html",
                    controller: "BlogController",
                    controllerAs: "vm",
                    title: "blog",
                    settings: {
                        nav: 2,
                        content: "<span class=\"glyphicon glyphicon-search\"></span>Blog"
                    }
                }
            }
        ];
    }

    class ConfigureRout {
        static $inject: Array<string> = ["$stateProvider"];
        constructor( $stateProvider: ng.ui.IStateProvider ) {
            const states = getStates();
            states.forEach( state => {
                $stateProvider.state( state.state, state.config );
            });
        }
    }

    angular
        .module( "sections.blog" )
        .config( ConfigureRout );

}