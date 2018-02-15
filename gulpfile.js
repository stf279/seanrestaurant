"use strict";

const gulp = require('gulp');
const htmlbeautify = require('gulp-html-beautify');
const less = require('gulp-less');
const htmlSources = './*.html';
const cssSources = './css/*.less';
const autoprefixer = require('gulp-autoprefixer');
const bs = require('browser-sync').create();
const watch = require('gulp-watch');

gulp.task('less', function () {
  return gulp.src(cssSources)
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('htmlbeautify', function() {

 gulp.src(htmlSources)
    .pipe(htmlbeautify({indentSize: 2}))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function (){
    gulp.watch(cssSources, ['less']).on('change', bs.reload);
    gulp.watch(htmlSources, ['htmlbeautify']).on('change', bs.reload);
});

gulp.task('default', ['htmlbeautify', 'less', 'watch']);