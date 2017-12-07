'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const inject = require('gulp-inject');

const PATHS = {
   base: './',
   src: './src',
   deps: './node_modules'
};

const FILES = {
  index: `${PATHS.src}/index.html`
};

const IGNORE = {
  src: 'src',
  deps: 'node_modules'
};


gulp.task('inject:app', () => {
  let target = gulp.src(FILES.index);
  // lets start with an array of one glob, that way its
  // easy to add more later
  let sources = gulp.src(
    // glob to recursively look through all components folder for JS
    [
      `${PATHS.src}/app.module.js`,
      `${PATHS.src}/app.routes.js`,
      `${PATHS.src}/components/**/*.js`,
      `${PATHS.src}/components/**/*.css`
    ],
    // this is nifty. gulp doesn't actually have to read the contents
    // of any of these files.  we only care about their locations!
    {
      read: false
    }
  );
  return target
          .pipe(inject(sources, {
            ignorePath: IGNORE.src,
            name: 'app'
          }))
          // hmm, its a bit scary to write over top of our source
          // file, but it appears that this is what is expected
          // for this plugin.  ok then!
          .pipe(gulp.dest(PATHS.src));

});

gulp.task('inject:vendor', () => {
  let target = gulp.src(FILES.index);
  let sources = gulp.src(
    // our vendor files from node_modules
    [
      `${PATHS.deps}/lodash/lodash.js`,
      `${PATHS.deps}/angular/angular.js`,
      `${PATHS.deps}/angular-route/angular-route.js`,
      `${PATHS.deps}/todomvc-app-css/index.css`,
    ], {
      read: false
    }
  );
  return target
          .pipe(inject(sources, {
            ignorePath: IGNORE.deps,
            name: 'vendor'
          }))
          .pipe(gulp.dest(PATHS.src));
});

gulp.task('inject', ['inject:vendor', 'inject:app']);

gulp.task('serve:src', ['inject:app', 'inject:vendor'], () => {
    browserSync.init({
        server: {
            baseDir: [PATHS.src, PATHS.deps]
        },
        // watch /src
        files: PATHS.src
    });
});

// alias, because we will have to serve:src or serve:dist, and
// can default to source
gulp.task('serve', ['serve:src', 'inject']);

// always good to have a default
gulp.task('default', ['serve']);
