'use strict';
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    style = require('gulp-stylus'),
    plumber = require('gulp-plumber'),
    sync = require('browser-sync'),
    // uncss = require('gulp-uncss'),
    // watch = require('gulp-watch'),
    koutoSwiss = require('kouto-swiss');

var started = false;
var paths = {
  stylus: './stylus/style.styl',
  css: './public/styles/',
  js: [
    '**/*.js',
    '!node_modules'
  ],
  jade: './templates/**/*.js'
};

gulp.task('serve', function(cb) {
  nodemon({
  script: './app.js',
  ext: 'js',
  watch: [paths.jade],
  env: {
    'NODE_ENV': 'development'
  },
  ignore: ['./core/**']
  //nodeArgs: ['--debug']
  })
    .on('start', function() {
      if (!started) {
        started = true;
        cb();
      }
    });
});

gulp.task('sync', ['watch'], function() {
  sync({
    server: {
      baseDir: 'public/'
    },
    open: true,
    port: 9000
  });
});

gulp.task('style', function() {
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(style({
      use: koutoSwiss(),
      'include css': true
    }))
    .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function() {
  gulp.watch(paths.stylus, ['style']);
});

gulp.task('default', ['serve', 'style', 'watch']);
