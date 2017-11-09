// gulpfile.js
const gulp = require('gulp'),
      gutil = require('gutil'),
      // sass = require('gulp-sass'),
      del = require('del'),
      babel = require('gulp-babel'),
      browserify = require('browserify'),
      textToStream = require('vinyl-source-stream'),
      // most* gulp plugins like buffered!
      streamToBuffer = require('vinyl-buffer'),
      uglify = require('gulp-uglify');


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
// gulp.task('sass', ['clean-dist'], () => {
//   return gulp
//           .src('./src/styles/**/*.scss')
//           .pipe(sass())
//           .pipe(
//             gulp.dest('./dist')
//           );
// });

gulp.task('scripts', ['clean-dist'], () => {
  return browserify({
          entries: './src/scripts/main.js',
          debug: true
        })
        .bundle()
        // convert to a streaming vinyl object becuase
        // not all plugins support streams, and because
        // browserify returns a text stream.
        .pipe(textToStream('main.min.js'))
        // *most* gulp plugins expect a buffer:
        .pipe(streamToBuffer())
        // .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// TODO: we will replace the above scripts with this...
gulp.task('transpilejs', () => {
  return gulp
          .src('src/sripts/main.js')
          .pipe(babel())
          // lets dump it in a special dir for now,
          // just to be sure we know whats getting made.
          .pipe(
            gulp.dest('dist')
          );
});


// gulp.task('default', ['sass', 'scripts']);
