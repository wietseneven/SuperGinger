'use strict';
const gulp = require('gulp');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');


gulp.task('default', ['sass', 'scripts', 'watch', 'browser-sync']);

gulp.task('scripts', () => {
  var bundler = browserify({
    entries: './src/js/app.es6',
    debug: true
  })
    .transform(babelify, {presets: ['es2015']})
    .bundle();

  return bundler
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/scripts/'));
});

gulp.task('sass', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/styles'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch('./src/js/**/*.*', ['scripts']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: "http://localhost:7933",
    files: ["public/**/*.*"],
    browser: "google chrome",
    port: 3000,
  });
});

gulp.task('nodemon', (cb) => {

  var started = false;
  return nodemon({
    script: 'app.js'
  }).on('start', () => {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
});