var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plum = require('gulp-plumber'),
    sync = require('browser-sync'),
    auto = require('gulp-autoprefixer'),
    gzip = require('gulp-zip');

gulp.task('serve', ['sass'], function() {
  sync({
    proxy: 'localhost/painpoints'
  });
  gulp.watch(['./*.html']).on('change', sync.reload);
  gulp.watch(['./scss/_*.scss','./scss/style.scss'],['sass']);
});

gulp.task('sass', function() {
  return gulp.src('./scss/style.scss')
    .pipe(plum())
    .pipe(sass().on('error', sass.logError))
    .pipe(auto({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest('.'))
    .pipe(sync.stream());
});

gulp.task('watch', ['serve'], function() {
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('default', ['serve'], function() {});

gulp.task('zip', [], function() {
  return gulp.src(['./img', './*.php', './*.css', './*.png', './fonts', './js', './partials'])
    .pipe(gzip('nikpayne.zip'))
    .pipe(gulp.dest('dist'));
});
