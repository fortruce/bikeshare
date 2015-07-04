var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var babelify = require('babelify');
var reload = browserSync.reload;
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  app: './src/js/index.js',
  src: 'src/js/**/*.js',
  buildJs: 'build/js/',
  html: 'src/index.html',
  prodhtml: 'src/prod.html',
  build: 'build/',
  server: './src/server.js',
  scss: 'src/scss/main.scss',
  scssDir: 'src/scss/**/*.scss',
  css: 'build/css/',
  staticDir: 'src/static/**/*',
  minifyCss: 'build/css/**/*.css',
  minifyJs: 'build/js/**/*.js'
};

gulp.task('static', function () {
  gulp.src(paths.staticDir)
      .pipe(gulp.dest(paths.build));
});

gulp.task('scss', function () {
  gulp.src(paths.scss)
      .pipe(sass())
      .pipe(gulp.dest(paths.css))
      .pipe(reload({stream: true}));
});

gulp.task('browserify', function () {
  var b = browserify({
    entries: paths.app,
    debug: true,
    transform: [babelify.configure({
      stage: 0
    })]
  });

  return b.bundle()
          .pipe(source('app.js'))
          .pipe(gulp.dest(paths.buildJs));
});

gulp.task('html', function() {
  gulp.src(paths.html)
      .pipe(gulp.dest(paths.build));
});

gulp.task('watch', ['build'], function () {
  gulp.watch(paths.src, ['browserify']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scssDir, ['scss']);

  gulp.watch(paths.buildJs + '*.js').on('change', reload);
  gulp.watch(paths.build + '*.html').on('change', reload);
});

gulp.task('server', function() {
  nodemon({
    script: paths.server,
    watch: [paths.server]
  }).on('start', reload);
});

gulp.task('build', ['static', 'browserify', 'html', 'scss']);
gulp.task('production', ['build'], function () {
  gulp.src(paths.minifyJs)
      .pipe(uglify())
      .pipe(gulp.dest(paths.buildJs));

  gulp.src(paths.minifyCss)
      .pipe(minifyCss())
      .pipe(gulp.dest(paths.css));

  gulp.src(paths.prodhtml)
      .pipe(rename('index.html'))
      .pipe(gulp.dest(paths.build))
});

gulp.task('browserSync', ['watch'], function() {
  browserSync.init({
    proxy: 'localhost:3333'
  });
});

gulp.task('default', ['browserSync']);