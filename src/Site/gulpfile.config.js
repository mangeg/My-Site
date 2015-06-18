var config = ( function() {
    var fs = require( "fs-extra" );
    var project = fs.readJSONSync( "./project.json" );
    function config() {
        this.www = project.webroot;

        this.jsRoot = this.www + "/js/";
        this.jsAppRoot = this.jsRoot + "app/";
        this.jsFrameworkRoot = this.jsRoot + "framework/";
        this.jsAllGenerated = [this.jsAppRoot, this.jsFrameworkRoot];

        this.appRoot = "./App/";
        this.frameworkRoot = "./FrameworkModules/";
        

        this.allAppTypeScript = this.appRoot + "**/*.ts";
        this.allFrameworkTypeScript = this.frameworkRoot + "**/*.ts";
        this.allTypeScript = [this.allAppTypeScript, this.allFrameworkTypeScript];

        this.typeScriptTypings = "./Tools/Typings/";
        this.typeScriptLibTypings = "./Tools/Typings/**/*.ts";
        this.typeScriptAppReference = this.typeScriptTypings + "typescriptApp.d.ts";
    }
    return config;
} )();
module.exports = config;