// gulpfile.js
const gulp = require('gulp'),
      gutil = require('gutil'),
      sass = require('gulp-sass'),
      del = require('del'),
      browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      uglify = require('gulp-uglify');

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

// homework: convert sass to `css` and
// add partials autoprefixer, less, minification...
gulp.task('sass', ['clean-dist'], () => {
  return gulp
          .src('./src/styles/**/*.scss')
          .pipe(sass())
          .pipe(
            gulp.dest('./dist/styles')
          );
});

gulp.task('scripts', ['clean-dist'], () => {
  // this is a little different of a chain as it doesn't start
  // with gulp.src().  There is a `gulp-browserify` plugin you
  // can use if you want to keep that uniformity
  return browserify('src/scripts/main.js')
          // make a bundled output
          .bundle()
          // browserify doesn't return a "stream", which gulp needs.
          // source() takes outputs and turns them into streams.
          .pipe(source('app.js'))
          .on('error', gutil.log)
          .pipe(buffer()) // why? dunno!
          .on('error', gutil.log)
          // .pipe(rename('ugly.js'))
          // .pipe(uglify()) -> uglify has a problem, not sure why!
          .on('error', gutil.log)
          .pipe(
            gulp.dest('./dist')
          );
});


gulp.task('default', ['sass']);
