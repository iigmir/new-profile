const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const gulpSass    = require('gulp-sass');
const babel       = require('gulp-babel');
const extender    = require('gulp-html-extend');

gulp.task('browser-sync', function()
{
    let browserSync_setting = {
        server: { baseDir: "./docs" }
    };
    browserSync.init(browserSync_setting);
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
    let sass_setting = {
        outputStyle: "compressed"
    };
    return gulp.src("src/scss/*.scss")
    .pipe(gulpSass(sass_setting))
    .pipe(gulp.dest("docs/css"))
    .pipe(browserSync.stream());
});

gulp.task('html', function()
{
    let extender_setting = {
        annotations:false,
        verbose:true
    };
    return gulp.src('src/html/index.html')
    .pipe(extender(extender_setting))
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
