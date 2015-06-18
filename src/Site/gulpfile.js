var gulp = require( "gulp" );
var merge = require( "merge2" );
var typescript = require( "typescript" );
var Config = require( "./gulpfile.config" );
var $ = require( "gulp-load-plugins" )( { lazy: true } );

var config = new Config();

var tsProj = $.typescript.createProject( {
    target: "ES5",
    noExternalResolve: true,
    typescript: typescript,
    declarationFiles: true,
    module: "commonjs",
    noImplicitAny: true,
    removeComments: true
} );

gulp.task( "help", $.taskListing );
gulp.task( "default", ["help"] );

gulp.task( "compile", ["compile-ts-app"], function() {
} );
gulp.task( "compile-ts-framework", function() {
    log( "Compiling TypeScript Framework -> JavaScript" );

    var frameworkBuild = gulp.src( config.allFrameworkTypeScript )
        .pipe( $.sourcemaps.init() )
        .pipe( $.typescript( tsProj ) );

    return merge( [
        frameworkBuild.dts.pipe( gulp.dest( config.typeScriptTypings ) ),
        frameworkBuild.js
        .pipe( $.rename( function( path ) {
            path.dirname = path.dirname.toLowerCase();
            path.basename = path.basename.charAt( 0 ).toLowerCase() + path.basename.slice( 1 );
        } ) )
        .pipe( $.sourcemaps.write( "." ) )
        .pipe( gulp.dest( config.jsFrameworkRoot ) )
    ] );
} );
gulp.task( "compile-ts-app", ["compile-ts-framework"], function() {
    log( "Compiling TypeScript App -> JavaScript" );

    var frameworkBuild = gulp.src( config.allAppTypeScript )
        .pipe( $.sourcemaps.init() )
        .pipe( $.typescript( tsProj ) );

    return merge( [
        frameworkBuild.dts.pipe( gulp.dest( config.typeScriptTypings ) ),
        frameworkBuild.js
        .pipe( $.rename( function( path ) {
            path.dirname = path.dirname.toLowerCase();
            path.basename = path.basename.charAt( 0 ).toLowerCase() + path.basename.slice( 1 );
        } ) )
        .pipe( $.sourcemaps.write( "." ) )
        .pipe( gulp.dest( config.jsAppRoot ) )
    ] );
} );

gulp.task( "clean", function() {
    log( "Cleaning up" );
    return gulp.src( config.jsAllGenerated )
        .pipe( $.clean() );
} );

/**
 * Generate TypeScript references file
 */
gulp.task( "gen-ts-refs", function() {
    log( "Generating TypeScript app references" );
    var target = gulp.src( config.typeScriptAppReference );
    var sources = gulp.src( [config.allAppTypeScript, config.allFrameworkTypeScript], { read: false } );
    return target
        .pipe( $.inject( sources.pipe( $.print() ), {
                starttag: "//{",
                endtag: "//}",
                transform: function( filepath ) {
                    return "/// <reference path='../.." + filepath + "' />";
                }
            } )
        )
        .pipe( gulp.dest( config.typeScriptTypings ) );
} );

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log( msg ) {
    if ( typeof ( msg ) === "object" ) {
        for ( var item in msg ) {
            if ( msg.hasOwnProperty( item ) ) {
                $.util.log( $.util.colors.blue( msg[item] ) );
            }
        }
    } else {
        $.util.log( $.util.colors.blue( msg ) );
    }
}