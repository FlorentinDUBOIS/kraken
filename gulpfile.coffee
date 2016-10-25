# -----------------------------------------------------------------------------
# requirements
gulp    = require 'gulp'
plugins = (require 'gulp-load-plugins' )()

# -----------------------------------------------------------------------------
# default task
gulp.task 'default', ['watch']

# -----------------------------------------------------------------------------
# watch task
gulp.task 'watch', ['build'], ->
    gulp.watch ['client/controllers/**/*.coffee', 'client/languages/**/*.json'], ['build:angular']
    gulp.watch ['client/stylesheets/**/*.scss'], ['build:stylesheets']

    return

# -----------------------------------------------------------------------------
# build task
gulp.task 'build', ['build:angular', 'build:stylesheets']

# -----------------------------------------------------------------------------
# build:angular task
gulp.task 'build:angular', ['devlint:coffee'], ->
    gulp.src ['client/controllers/**/*.coffee']
        .pipe plugins.plumberNotifier()
        .pipe plugins.concat 'main.js'
        .pipe plugins.coffee bare: true
        .pipe plugins.browserify( transforms: ['envify'])
        .pipe gulp.dest 'client/dist'
        .pipe plugins.rename suffix: '.min'
        .pipe plugins.uglify compress: {}
        .pipe gulp.dest 'client/dist'

# -----------------------------------------------------------------------------
# build:stylesheets task
gulp.task 'build:stylesheets', ->
    gulp.src ['client/stylesheets/imports.scss']
        .pipe plugins.plumberNotifier()
        .pipe plugins.sass.sync()
        .pipe plugins.autoprefixer()
        .pipe gulp.dest 'client/dist'
        .pipe plugins.rename suffix: '.min'
        .pipe plugins.cssnano()
        .pipe gulp.dest 'client/dist'

# -----------------------------------------------------------------------------
# devlint task
gulp.task 'devlint', ['devlint:coffee']

# -----------------------------------------------------------------------------
# devlint:coffee task
gulp.task 'devlint:coffee', ->
    gulp.src ['client/**/*.coffee', 'server/**/*.coffee', 'server.coffee', 'install.coffee', 'gulpfile.coffee']
        .pipe plugins.plumberNotifier()
        .pipe plugins.coffeelint 'coffeelint.json'
        .pipe plugins.coffeelint.reporter 'coffeelint-stylish'
        .pipe plugins.coffeelint.reporter 'fail'

# -----------------------------------------------------------------------------
# lint task
gulp.task 'lint', ['lint:coffee']

# -----------------------------------------------------------------------------
# lint:coffee task
gulp.task 'lint:coffee', ->
    gulp.src ['client/**/*.coffee', 'server/**/*.coffee', 'server.coffee', 'install.coffee', 'gulpfile.coffee']
        .pipe plugins.coffeelint 'coffeelint.json'
        .pipe plugins.coffeelint.reporter 'coffeelint-stylish'
        .pipe plugins.coffeelint.reporter 'fail'
