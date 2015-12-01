var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('precheckin', function(callback) {
  return runSequence(
    'clean',
    'lint',
    'test',
    ['build-system', 'build-html', 'build-css'],
    callback
  );
});