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

        /*
         * LESS
         */
        this.lessRoot = "./Content/Less/";
        this.lessAll = this.lessRoot + "**/*.less";
        this.lessIndex = this.lessRoot + "Site.less";

        /*
         * JS
         */
        this.jsRoot = this.www + "/js/";
        this.jsLib = this.jsRoot + "lib/";
        this.jsAppRoot = this.jsRoot + "app/";
        this.jssAllApp = this.jsAppRoot + "**/*.js";
        this.jsAllLib = this.jsLib + "**/*.js";
        this.jsAllGenerated = [this.jssAllApp, this.jsAllLib];

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
         * Index
         */
        this.layoutHome = "./Views/Shared/";
        this.indexHome = "./Views/Home/";
        this.index = this.layoutHome + "_Layout.cshtml";
    }

    return config;
} )();
module.exports = config;