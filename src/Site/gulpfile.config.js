var config = ( function() {
    var fs = require( "fs-extra" );
    var project = fs.readJSONSync( "./project.json" );

    function config() {
        this.www = project.webroot;

        /*
         * CSS
         */
        this.cssRoot = this.www + "/content/css/";
        this.cssAll = this.cssRoot + "**/*.css";
        this.cssAllMap = this.cssRoot + "**/*.map";

        /*
         * LESS
         */
        this.lessRoot = "./Content/Less/";
        this.lessAll = this.lessRoot + "**/*.less";
        this.appLess = "./App/**/*.less";
        this.lessIndex = this.lessRoot + "Site.less";

        /*
         * JS
         */
        this.jsRoot = this.www + "/js/";
        this.jsLib = this.jsRoot + "lib/";
        this.jsAppRoot = this.jsRoot + "app/";
        this.jssAllApp = this.jsAppRoot + "**/*.js";
        this.jsAllAppMap = this.jsAppRoot + "**/*.map";
        this.jsAllLib = this.jsLib + "**/*.js";
        this.jsAllGenerated = [this.jssAllApp, this.jsAllAppMap, this.jsAllLib];

        this.js = [
            this.jsAppRoot + "**/*.module.js",
            this.jsAppRoot + "**/*.js",
            "!" + this.jsAppRoot + "**/*.spec.js",
        ];
        this.jsOrder = [
            "**/app.module.js",
            "**/blocks/**/*.module.js",
            "**/blocks/**/*.js",
            "**/*.module.js",
            "**/*.js"
        ];

        /*
         * TypeScript
         */
        this.appRoot = "./App/";

        this.tsAllApp = this.appRoot + "**/*.ts";
        this.tsAll = [this.tsAllApp];

        this.tsTypings = "./Tools/Typings/";
        this.tsTypingsLib = "./Tools/Typings/**/*.ts";
        this.tsTypingsAppReference = this.tsTypings + "typescriptApp.d.ts";

        /*
         * HTML
         */
        this.htmlAllApp = this.appRoot + "**/*.html";
        this.htmlAll = [this.htmlAllApp];
        this.htmlGenerated = this.jsAppRoot + "/**/*.html";

        /*
         * Index
         */
        this.layoutHome = "./Views/Shared/";
        this.indexHome = "./Views/Home/";
        this.index = this.layoutHome + "_Layout.cshtml";

        /*
         * Manual copy
         */
        this.bowerPath = "./bower_components/";
        this.bowerComponents = {
            "bootstrap": {
                src: "/bootstrap/dist/**/*.{ttf,svg,woff,eot}",
                dest: this.www + "/content",
                base: this.bowerPath + "bootstrap/dist"
            },
            "font-awsome": {
                src: "/font-awesome/fonts/*.*",
                dest: this.www + "/js/lib/font-awsome/",
                base: this.bowerPath + "font-awsome"
            }
        };
    }

    return config;
} )();
module.exports = config;