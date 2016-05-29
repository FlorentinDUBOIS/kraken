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
// lint task
gulp.task( 'lint', ['lint:js']);

// ----------------------------------------------------------------------------
// lint:js task
gulp.task( 'lint:js', () => {
    gulp.src(['server/**/*.js', 'client/controllers/**/*.js'])
        .pipe( plugins.plumberNotifier())
        .pipe( plugins.eslint( require( './.eslintrc' )))
        .pipe( plugins.eslint.formatEach())
        .pipe( plugins.eslint.failAfterError());
});

// ----------------------------------------------------------------------------
// test task
gulp.task( 'test', ['test:lint']);

// ----------------------------------------------------------------------------
// test:lint task
gulp.task( 'test:lint', ['test:lint-js']);

// ----------------------------------------------------------------------------
// test:lint-js task
gulp.task( 'test:lint-js', () => {
     gulp.src(['server/**/*.js', 'client/controllers/**/*.js'])
        .pipe( plugins.eslint( require( './.eslintrc' )))
        .pipe( plugins.eslint.formatEach())
        .pipe( plugins.eslint.failAfterError());
});

// ----------------------------------------------------------------------------
// build
gulp.task( 'build', ['build:js', 'build:css']);

// ----------------------------------------------------------------------------
// build:js
gulp.task( 'build:js', ['lint:js'], () => {
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
