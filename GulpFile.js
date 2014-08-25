"use strict";

var gulp  = require("gulp"),
    shell = require("gulp-shell"),
    _ = require("lodash"),
    cmdArgs = require( "./shell-args.js" ),
    cmdTemplate = require( "./shell-template.js" );

gulp.task( "default", function() {
    var cmd = _.template( cmdTemplate, cmdArgs );
    return gulp.src(".").pipe( shell( [
        "echo \"" + cmd + "\" > pandoc.sh",
        cmd
    ] ) );
} );
