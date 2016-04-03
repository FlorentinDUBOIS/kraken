// -----------------------------------------------------------------------------
// requirements
const gulp    = require( 'gulp' );
const plugins = require( 'gulp-load-plugins' )();
const named   = require( 'vinyl-named-with-path' );
const webpack = require( 'webpack-stream' );
const wpconf  = require( './webpack.config' );

// -----------------------------------------------------------------------------
// task
gulp.task( 'default', ['build'], () => {
    gulp.watch(['libs/react/sources/**/*.jsx'], ['build:js']);
    gulp.watch(['libs/stylesheets/sources/**/*.scss'], ['build:scss']);
});

// -----------------------------------------------------------------------------
// build
gulp.task( 'build', ['build:js', 'build:scss'] );

// -----------------------------------------------------------------------------
// build js
gulp.task( 'build:js', () => {
    gulp.src(['libs/react/sources/main.jsx'])
        .pipe( plugins.plumberNotifier())
        .pipe( named())
        .pipe( webpack({ module: wpconf.module }))
        .pipe( gulp.dest( wpconf.output.path ))
        .pipe( plugins.uglify({ compress: {}}))
        .pipe( plugins.rename({ suffix: '.min' }))
        .pipe( gulp.dest( wpconf.output.path ));
});

// -----------------------------------------------------------------------------
// build scss
gulp.task( 'build:scss', () => {
    gulp.src(['libs/stylesheets/sources/imports.scss'])
        .pipe( plugins.plumberNotifier())
        .pipe( plugins.sass.sync())
        .pipe( plugins.autoprefixer())
        .pipe( gulp.dest( 'libs/stylesheets/compiled' ))
        .pipe( plugins.cssnano({ compress: {}}))
        .pipe( plugins.rename({ suffix: '.min' }))
        .pipe( gulp.dest( 'libs/stylesheets/compiled' ));
});
