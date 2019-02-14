const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const gulpSass    = require('gulp-sass');
const babel       = require('gulp-babel');
const extender    = require('gulp-html-extend');

gulp.task('browser-sync', function()
{
    browserSync.init
    ({
        server: { baseDir: "./docs" }
    });
});

gulp.task('jscompress', function(cb)
{
    let babel_setting = {
        presets: ["@babel/env"]
    };
    return gulp.src("./src/js/index.js")
    .pipe(babel(babel_setting))
    .pipe(gulp.dest("./docs/js"));
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

gulp.task('html', function()
{
    gulp.src('src/html/index.html')
        .pipe(extender({annotations:false,verbose:true}))
        .pipe(gulp.dest('./docs'));
});

gulp.task('watch', function ()
{
    gulp.watch('src/html/*.html', ['html']);
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/js/*.js", ['jscompress']);
    gulp.watch("docs/*/*").on('change', browserSync.reload);
    gulp.watch("docs/*").on('change', browserSync.reload);
});

gulp.task('default',['browser-sync','watch']);
