"use strict";

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    cssunit = require('gulp-css-unit');

// Logs Message
gulp.task('message', function () {
    return console.log('Gulp is running...');
});

// Optimize Images
gulp.task('images', () =>
    gulp.src('./src/images/**')
        // .pipe(imagemin(
        //     {
        //         interlaced: true,
        //         progressive: true,
        //         optimizationLevel: 7,
        //         svgoPlugins: [{removeViewBox: true}]
        //     }
        // ))
        .pipe(gulp.dest('./dist/images'))
);

// Minify JS
// gulp.task('minify', function () {
//     gulp.src('./src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/js'));
// });

// Compile Sass
gulp.task('sass', function () {
    gulp.src('./src/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(cssunit({
            type: 'px-to-rem',
            rootSize: 16
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

// Scripts
gulp.task('scripts', function () {
    gulp.src('./src/js/main.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

// gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts']);


gulp.task('serve', ['sass', 'scripts', 'images'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch('./src/sass/*.scss', ['sass']);
    gulp.watch('./src/js/*.js', ['scripts']);
    gulp.watch('./src/images/*', ['images']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);