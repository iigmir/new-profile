var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var gulpSass    = require('gulp-sass');
var uglify      = require('gulp-uglify');
var pump        = require('pump');

gulp.task('browser-sync', function()
{
    browserSync.init({
        server: {
            baseDir: "./docs"
        }
    });
});

gulp.task('watch', function ()
{
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/js/*.js", ['jscompress']);
    gulp.watch("docs/*/*").on('change', browserSync.reload);
    gulp.watch("docs/*").on('change', browserSync.reload);
});

gulp.task('jscompress', function(cb)
{
    pump
    ([
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('docs/js')
    ],cb);
});

gulp.task('sass', function()
{
    return gulp.src("src/scss/*.scss")
        .pipe(gulpSass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest("docs/css"))
        .pipe(browserSync.stream());
});


gulp.task('default',['browser-sync','watch']);
