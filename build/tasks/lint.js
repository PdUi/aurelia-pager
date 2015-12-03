var gulp = require('gulp');
var paths = require('../paths');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
var csslint = require('gulp-csslint');
var sass = require('gulp-sass');

// runs eslint on all .js files
gulp.task('lint-js', function() {
  return gulp.src(paths.source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lint-css', function() {
    return gulp.src(paths.scss)
      .pipe(sass())
      .pipe(csslint())
      .pipe(csslint.reporter());
})

gulp.task('lint', function(callback) {
  return runSequence(
    'lint-js',
    'lint-css',
    callback
  );
});
