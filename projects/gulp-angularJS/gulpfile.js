'use strict'

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const inject = require('gulp-inject')


gulp.task('hello', [], () => {
  console.log('Hello world.');
});


gulp.task('index', function() {
  let target = gulp.src('./src/index.html');
  // lets start with an array of one glob, that way its
  // easy to add more later
  let sources = gulp.src(
    // glob to recursively look through all components folder for JS
    [
      './src/components/**/*.js',
      './src/components/**/*.css'
    ],
    // this is nifty. gulp doesn't actually have to read the contents
    // of any of these files.  we only care about their locations!
    { read: false },
    // remove leading /src from file paths.
    {relative: true}
  );
  return target
          .pipe(inject(sources))
          // hmm, its a bit scary to write over top of our source
          // file, but it appears that this is what is expected
          // for this plugin.  ok then!
          .pipe(gulp.dest('./src'));

});


gulp.task('serve:src', () => {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

// alias, because we will forget the specific
gulp.task('serve', ['serve:src']);

// always good to have a default
gulp.task('default', ['serve']);
