# -----------------------------------------------------------------------------
# requirements
gulp    = require 'gulp'
plugins = (require 'gulp-load-plugins' )()
webpack = require 'webpack-stream'
named   = require 'vinyl-named'

# -----------------------------------------------------------------------------
# default task
gulp.task 'default', ['watch']

# -----------------------------------------------------------------------------
# watch task
gulp.task 'watch', ['build'], ->
    gulp.watch ['client/controllers/**/*.coffee', 'client/languages/**/*.json'], ['build:angular']

# -----------------------------------------------------------------------------
# build task
gulp.task 'build', ['build:angular']

# -----------------------------------------------------------------------------
# build:angular task
gulp.task 'build:angular', ->
    gulp.src ['client/controllers/**/*.coffee']
        .pipe plugins.plumberNotifier()
        .pipe plugins.concat 'main.min.js'
        .pipe plugins.coffee bare: true
        .pipe gulp.dest 'client/dist'
        .pipe named()
        .pipe webpack()
        .pipe plugins.uglify compress: {}
        .pipe gulp.dest 'client/dist'