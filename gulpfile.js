'use strict';

// include gulp
var gulp = require('gulp');
// include our plugins
var jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject'),
    babel = require("gulp-babel"),
    karma = require('karma').server,
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    stylus = require('gulp-stylus'),
    csscomb = require('gulp-csscomb');


// Lint Task
gulp.task('lint', function () {
  return gulp.src('app/**/*.js')
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});


gulp.task('ownfiles', function () {
  var target = gulp.src('./app/index.html');

  var sources = gulp.src(['./dist/all.min.js', './dist/css/all.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./app'));
});

// concatenate & minify js
gulp.task('scripts', function () {
  return gulp.src(['app/**/*.js', '!app/**/*.spec.js'])
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));

});

// stylus task
gulp.task('stylus', function () {
    return gulp.src([
            './app/css/*.styl'
        ])
        .pipe( stylus({
          compress: true
        }) )
        .pipe(concat('all.css'))
        .pipe(csscomb())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

//Watch task
gulp.task('js-watch', ['scripts', 'lint'], browserSync.reload);
gulp.task('css-watch', ['stylus']);

// Unit testing task
gulp.task('unit', function (done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, function() {
    done();
  });
});

// webserver and live reload
gulp.task('serve', ['scripts', 'stylus'], function() {
    browserSync({
        //logConnections: false,
        //logFileChanges: false,
        notify: false,
        open: true,
        server: {
            baseDir: "app",
            routes: {
              "/bower_components" : "bower_components",
              "/dist" : "dist",
              "/test/mockup" : "mockup"
            }
        }
    });
    gulp.watch('app/**/*.js', ['js-watch']);
    gulp.watch('app/css/*.styl', ['css-watch']);
    gulp.watch('app/**/*.html').on('change', browserSync.reload);
});




// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app'));
});

gulp.task('default', ['lint', 'js-watch', 'scripts', 'stylus', 'wiredep', 'ownfiles', 'serve']);
