require("dotenv").load();
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var babelify = require('babelify');
var reload = browserSync.reload;
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  src: {
    dir:      'src/',
    js:       'src/js/index.js',
    html:     'src/index.jade',
    server:   'src/server.js',
    css:      'src/scss/main.scss',
    static:   'src/static/**/*'
  },
  build: {
    dir:    'build/',
    dist:   'build/dist/',
    js:     'build/dist/js/',
    css:    'build/dist/css/'
  },
  watch: {
    js:   'src/js/**/*.js',
    css:  'src/scss/**/*.scss'
  }
}

// Copy static assets into dist/ folder
gulp.task('static', function () {
  gulp.src(paths.src.static)
      .pipe(gulp.dest(paths.build.dist));
});

gulp.task('server', function () {
  gulp.src(paths.src.server)
      .pipe(gulp.dest(paths.build.dir));
});

// Compile SCSS into css & reload browserSync
gulp.task('scss', function () {
  gulp.src(paths.src.css)
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest(paths.build.css))
      .pipe(reload({stream: true}));
});

// Browserify JS into single bundle with es6 compilation
gulp.task('browserify', function () {
  var b = browserify({
    entries: paths.src.js,
    debug: true,
    transform: [babelify.configure({
      stage: 0
    })]
  });

  return b.bundle()
          .pipe(source('app.js'))
          .pipe(gulp.dest(paths.build.js));
});

// Compile the HTML Jade template with dev values
gulp.task('html-dev', function() {
  gulp.src(paths.src.html)
      .pipe(jade({ locals: { apiKey: process.env.API_KEY }}))
      .pipe(gulp.dest(paths.build.dist))
});

// Watch all folders and re-compile on changes
gulp.task('watch', ['build'], function () {
  gulp.watch(paths.watch.js, ['browserify']);
  gulp.watch(paths.src.html, ['html-dev']);
  gulp.watch(paths.watch.css, ['scss']);
  gulp.watch(paths.src.static, ['static']);
  gulp.watch(paths.src.server, ['server']);

  gulp.watch(paths.build.js + '*.js').on('change', reload);
  gulp.watch(paths.build.dist + 'index.html').on('change', reload);
});

// Do everything necessary for a proper build
gulp.task('build', ['static', 'browserify', 'html-dev', 'scss', 'server']);

// Do a production build -
//    Minify JS & CSS and compile the HTML Jade template with prod values
gulp.task('production', ['build'], function () {
  gulp.src(paths.build.js + '**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest(paths.build.js));

  gulp.src(paths.build.css + '**/*.css')
      .pipe(minifyCss())
      .pipe(gulp.dest(paths.build.css));

  var timestamp = Date.now();
  gulp.src(paths.src.html)
      .pipe(jade({
        locals: {
          jsVersion: timestamp,
          cssVersion: timestamp,
          apiKey: process.env.API_KEY,
          production: true
        }
      }))
      .pipe(gulp.dest(paths.build.dist))
});

// Run a browsersync server for automatic reloads and css injection
gulp.task('browserSync', ['watch'], function() {
  browserSync.init({
    proxy: 'localhost:3333'
  });
});

gulp.task('default', ['browserSync']);
