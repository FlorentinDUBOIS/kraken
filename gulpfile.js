// ----------------------------------------------------------------------------
// requirements
const gulp    = require( 'gulp' );
const plugins = require( 'gulp-load-plugins' )();

// ----------------------------------------------------------------------------
// default
gulp.task( 'default', ['watch']);

// ----------------------------------------------------------------------------
// watch
gulp.task( 'watch', ['build'], () => {
    gulp.watch(['client/controllers/**/*.js', 'client/languages/*.lang.json'], ['build:js']);
    gulp.watch(['client/stylesheets/**/*.scss'], ['build:css']);
});

// ----------------------------------------------------------------------------
// build
gulp.task( 'build', ['build:js', 'build:css']);

// ----------------------------------------------------------------------------
// build:js
gulp.task( 'build:js', () => {
    gulp.src(['client/controllers/**/*.js'])
        .pipe( plugins.plumberNotifier())
        .pipe( plugins.concat( 'main.min.js' ))
        .pipe( gulp.dest( 'client/dist' ))
        .pipe( require( 'vinyl-named' )())
        .pipe( require( 'webpack-stream' )())
        .pipe( plugins.uglify({ compress: {}}))
        .pipe( gulp.dest( 'client/dist' ));
});

// ----------------------------------------------------------------------------
// build:css
gulp.task( 'build:css', () => {
    gulp.src(['client/stylesheets/imports.scss'])
        .pipe( plugins.plumberNotifier())
        .pipe( plugins.sass.sync())
        .pipe( plugins.autoprefixer())
        .pipe( plugins.cssnano())
        .pipe( plugins.rename({ suffix: '.min' }))
        .pipe( gulp.dest( 'client/dist' ));
});