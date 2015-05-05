var gulp = require('gulp');
// var browserify = require('gulp-browserify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;

var paths = {
  app: './src/js/app.js',
  src: 'src/js/**/*.js',
  buildJs: 'build/js/',
  html: 'src/index.html',
  build: 'build/',
  server: './src/server.js'
}

gulp.task('browserify', function () {
  var b = browserify({
    entries: paths.app,
    debug: true,
    transform: ['babelify']
  });

  return b.bundle()
          .pipe(source('app.js'))
          .pipe(gulp.dest(paths.buildJs));
});

gulp.task('html', function() {
  gulp.src(paths.html)
      .pipe(gulp.dest(paths.build));
});

gulp.task('watch', ['browserify', 'html'], function () {
  gulp.watch(paths.src, ['browserify']);
  gulp.watch(paths.html, ['html']);

  gulp.watch(paths.buildJs + '*.js').on('change', reload);
  gulp.watch(paths.build + '*.html').on('change', reload);
});

gulp.task('server', function() {
  nodemon({
    script: paths.server,
    watch: [paths.server]
  }).on('start', reload);
});

gulp.task('build', ['browserify', 'html']);

gulp.task('browserSync', ['server', 'watch'], function() {
  browserSync.init({
    proxy: 'localhost:3000'
  });
});

gulp.task('default', ['browserSync']);