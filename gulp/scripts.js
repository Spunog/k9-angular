'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  var sources = [
                  path.join(conf.paths.src, '/app/**/*.js'),
                  path.join(conf.paths.src, '/app/common/directives/*.js'),
                ];
  return gulp.src(sources)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe(browserSync.reload({ stream: true }))
    .pipe($.size());
});
