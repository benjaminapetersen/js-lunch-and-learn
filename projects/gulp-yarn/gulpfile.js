// gulpfile.js
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      del = require('del');

// make a dummy task:
gulp.task('my-task', () => {
  console.log('This is my task! Wheee...');
});

gulp.task('clean-dist', () => {
  // lets do an array this time
  return del([
    //'dist/styles',
    //'dist/scripts'
    'dist'
  ]);
});

gulp.task('sass', ['clean-dist'], () => {
  return gulp
          .src('./src/styles/**/*.scss')
          .pipe(sass())
          .pipe(
            gulp.dest('./dist/styles')
          );
});
