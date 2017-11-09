'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
var livereload = require('gulp-livereload');
const http = require('http');
const st = require('st');

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('all.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
});

gulp.task('server', function(done) {
    http.createServer(
        st({ path: __dirname + '/', index: 'index.html', cache: false })
    ).listen(8080, done);
});

gulp.task('watch',  ['server'], function() {
    livereload.listen();
    gulp.watch('sass/**/*.scss', ['sass']);
});