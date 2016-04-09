var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plum = require('gulp-plumber'),
    sync = require('browser-sync'),
    auto = require('gulp-autoprefixer'),
    gzip = require('gulp-zip'),
    ugly = require('gulp-uglify');

gulp.task('serve', ['sass', 'compress'], function() {
  sync({
    proxy: 'localhost/painpoints',
    open: false
  });
  gulp.watch(['./*.html']).on('change', sync.reload);
  gulp.watch(['./scss/_*.scss','./scss/style.scss'],['sass']);
  gulp.watch(['./src/*.js'],['compress']);
});

gulp.task('compress', function() {
  return gulp.src('./src/*.js')
    .pipe(plum())
    .pipe(ugly())
    .pipe(gulp.dest('./js'));
});

gulp.task('sass', function() {
  return gulp.src('./scss/style.scss')
    .pipe(plum())
    .pipe(sass({ sourceComments: true, outputStyle: "compressed"}).on('error', sass.logError))
    .pipe(auto({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest('.'))
    .pipe(sync.stream());
});

gulp.task('watch', ['serve'], function() {
  gulp.watch('./scss/*.scss', ['sass', 'compress']);
});

gulp.task('default', ['serve'], function() {});

gulp.task('zip', [], function() {
  return gulp.src(['./**', '!./node_modules', '!./node_modules/**', '!./dist'])
    .pipe(gzip('nikpayne.zip'))
    .pipe(gulp.dest('dist'));
});
