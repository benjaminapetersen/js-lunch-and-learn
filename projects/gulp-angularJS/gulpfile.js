'use strict'

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const inject = require('gulp-inject');

// TODO: refactor the tasks below to use this!
// const PATHS = {
//   base: './',
//   src: './src'
// }

gulp.task('hello', [], () => {
  console.log('Hello world.');
});


gulp.task('inject:app', () => {
  let target = gulp.src('./src/index.html');
  // lets start with an array of one glob, that way its
  // easy to add more later
  let sources = gulp.src(
    // glob to recursively look through all components folder for JS
    [
      './components/**/*.js',
      './components/**/*.css'
    ],
    // this is nifty. gulp doesn't actually have to read the contents
    // of any of these files.  we only care about their locations!
    {
      read: false,
      cwd: __dirname + '/src'
    }
  );
  return target
          .pipe(inject(sources, {
            ignorePath: 'src',
            name: 'app' 
          }))
          // hmm, its a bit scary to write over top of our source
          // file, but it appears that this is what is expected
          // for this plugin.  ok then!
          .pipe(gulp.dest('./src'));

});

gulp.task('inject:vendor', () => {
  let target = gulp.src('./src/index.html');
  let sources = gulp.src(
    // our vendor files from node_modules
    [
      './node_modules/lodash/lodash.js',
      './node_modules/angular/angular.js',
      './node_modules/todomvc-app-css/index.css'
    ], {
      read: false
    }
  );
  return target
          .pipe(inject(sources, {
            ignorePath: 'src',
            name: 'vendor'
          }))
          .pipe(gulp.dest('./src'));
});


gulp.task('serve:src', ['inject:app', 'inject:vendor'], () => {
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
