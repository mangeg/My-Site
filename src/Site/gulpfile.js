var gulp = require( "gulp" );
var merge = require( "merge2" );
var typescript = require( "typescript" );
var Config = require( "./gulpfile.config" );
var $ = require( "gulp-load-plugins" )( { lazy: true } );

var config = new Config();

var tsProj = $.typescript.createProject( {
    target: "ES5",
    noExternalResolve: false,
    typescript: typescript,
    declarationFiles: false,
    module: "commonjs",
    noImplicitAny: true,
    removeComments: false
} );

gulp.task( "help", $.taskListing );
gulp.task( "default", ["help"] );

gulp.task( "watch", ["watch-ts", "watch-less", "watch-html"], function() {} );
gulp.task( "watch-ts", function() {
    log( "Watching for TypeScript changes..." );
    $.watch( config.tsAll, { verbose: true, name: "TS-W" }, function( event ) {
        if( event.event === "change" || event.evet === "add" ) {
            if( event.evet === "add" )
                gulp.start( "compile-ts", "ts-lint", "gen-ts-refs", "wiredep" );
            else
                gulp.start( "compile-ts", "ts-lint", "gen-ts-refs" );
        }
        if ( event.event === "unlink" ) {
            gulp.start( "build" );
        }
    } );
} );
gulp.task( "watch-less", function() {
    log( "Watching for LESS changes..." );
    $.watch( config.lessAll, { verbose: true, name: "LESS-W" }, function( event ) {
        gulp.start( "compile-less" );
    } );
} );
gulp.task( "watch-html", function() {
    log( "Watching HTML-file changes..." );
    $.watch( config.htmlAll, { verbose: true, name: "HTML-W" }, function( event ) {
        if ( event.event !== "unlink" ) {
            gulp.src( event.path, { base: "./App" } )
                .pipe( gulp.dest( config.jsAppRoot ) );
        }
    } );
} );

gulp.task( "compile", ["compile-ts", "compile-less"], function() {
    return gulp.src( config.htmlAll )
        .pipe( gulp.dest( config.jsAppRoot ) );
} );
gulp.task( "compile-ts", function() {
    log( "Compiling TypeScript => JavaScript" );

    var compile = gulp.src( config.tsAllApp )
        .pipe( $.plumber() )
        .pipe( $.sourcemaps.init() )
        .pipe( $.typescript( tsProj ) );

    return merge( [
        compile.dts.pipe( gulp.dest( config.tsTypings ) ),
        compile.js
        .pipe( $.plumber() )
        .pipe( $.rename( function( path ) {
            path.dirname = path.dirname.toLowerCase();
            path.basename = path.basename.charAt( 0 ).toLowerCase() + path.basename.slice( 1 );
        } ) )
        .pipe( $.sourcemaps.write( "." ) )
        .pipe( gulp.dest( config.jsAppRoot ) )
    ] );
} );
gulp.task( "compile-less", function() {
    log( "Compiling LESS => CSS" );

    return gulp.src( config.lessAll )
        .pipe( $.plumber() )
        .pipe( $.sourcemaps.init() )
        .pipe( $.less() )
        .pipe( $.autoprefixer( { browsers: ["last 2 version"] } ) )
        .pipe( $.rename( function( path ) {
            path.dirname = path.dirname.toLowerCase();
            path.basename = path.basename.charAt( 0 ).toLowerCase() + path.basename.slice( 1 );
        } ) )
        .pipe( $.sourcemaps.write( "." ) )
        .pipe( gulp.dest( config.cssRoot ) );
} );

gulp.task( "clean", ["clean-generated-js", "clean-generated-css"], function() {
    log( "Cleaning generated HTML" );
    return gulp.src( config.htmlGenerated )
        .pipe( $.clean() );
} );
gulp.task( "clean-generated-js", function() {
    log( "Cleaning up generated JS" );
    return gulp.src( config.jsAllGenerated )
        .pipe( $.clean() );
} );
gulp.task( "clean-generated-css", function() {
    log( "Cleaning up generated CSS" );
    return gulp.src( config.cssAll )
        .pipe( $.clean() );
} );

gulp.task( "ts-lint", function() {
    log( "Running TypeScript lint" );
    return gulp.src( config.tsAll )
        .pipe( $.tslint() )
        .pipe( $.tslint.report( $.tslintStylish, {
            bell: false
        } ) );
} );

gulp.task( "gen-ts-refs", function() {
    log( "Generating TypeScript app references" );
    var target = gulp.src( config.tsTypingsAppReference );
    var sources = gulp.src( [config.tsAllApp], { read: false } );
    return target
        .pipe( $.inject( sources, {
                starttag: "//{",
                endtag: "//}",
                transform: function( filepath ) {
                    return "/// <reference path='../.." + filepath + "' />";
                }
            } )
        )
        .pipe( gulp.dest( config.tsTypings ) );
} );

gulp.task( "inject", function() {

    var target = gulp.src( config.index );
    var sources = gulp.src( config.cssAll, { read: false } );

    return target
        .pipe( $.inject( sources, { ignorePath: "wwwroot" } ) )
        .pipe( gulp.dest( config.layoutHome ) );

} );

gulp.task( "wiredep", function() {
    var wiredep = require( "wiredep" );
    var wiredepStream = wiredep.stream;

    var allDeps = wiredep();
    var copyJs = gulp.src( allDeps.js, { base: "./bower_components" } )
        .pipe( gulp.dest( config.jsLib ) );
    var copyCss = gulp.src( allDeps.css, { base: "./bower_components" } )
        .pipe( gulp.dest( config.jsLib ) );

    var js = gulp.src( [config.index] )
        .pipe( wiredepStream( {
            ignorePath: "../../bower_components",
            fileTypes: {
                html: {
                    replace: {
                        js: "<script src=\"/js/lib{{filePath}}\"></script>",
                        css: "<link rel=\"stylesheet\" href=\"js/lib{{filePath}}\" />"
                    }
                }
            }
        } ) )
        .pipe( inject( config.js, "", config.jsOrder ) )
        .pipe( gulp.dest( config.layoutHome ) );
    var less = gulp.src( [config.lessIndex] )
        .pipe( wiredepStream( {} ) )
        .pipe( gulp.dest( config.lessRoot ) );

    return merge( [js, less, copyJs, copyCss] );
} );

gulp.task( "build", $.sequence( "clean", ["compile", "ts-lint", "gen-ts-refs"], "inject", "wiredep" ) );

/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
function inject( src, label, order ) {
    var options = {
        read: false,
        ignorePath: "wwwroot"
    };
    if ( label ) {
        options.name = "inject:" + label;
    }

    return $.inject( orderSrc( src, order ), options );
}

/**
 * Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc( src, order ) {
    return gulp
        .src( src )
        .pipe( $.if( order, $.order( order ) ) );
}

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

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent( event ) {
    var srcPattern = new RegExp( "/.*(?=/" + config.source + ")/" );
    log( "File " + event.path.replace( srcPattern, "" ) + " " + event.type );
}