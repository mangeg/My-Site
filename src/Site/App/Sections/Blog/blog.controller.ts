module Sections.Blog {
    "use strict";

    class BlogController {
        static $inject: Array<string> = ["logger"];
        constructor( private logger: Blocks.Logger.ILogger ) {
        }
    }

    angular
        .module( "sections.blog" )
        .controller( "BlogController", BlogController );
}