'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var match = {
  recurse: '**/*'
};

var root = './',
    src = './src/',
    dist = './dist/',
    tmp = './.tmp/',
    tmpBuild = tmp + 'build/',
    test = './test/',
    testRelative = '/test/',
    demos = test + 'manual/';

var srcAll = src + match.recurse,
    distAll = dist +match.recurse,
    demoAll = demos + match.recurse,
    tmpAll = tmpBuild + match.recurse;

var srcJS = src + match.recurse + '.js',
    srcView = src + '/views/'+ match.recurse + '.html',
    srcLess = src + '/less/' + match.recurse + '.less';

var protocol = 'http://',
    host = 'localhost',
    serverPort = 9005,
    baseUrl = protocol + host + ':' + serverPort;

gulp.task('reload', reload);

gulp.task('serve', function() {
  // https://www.browsersync.io/docs/options
  browserSync({
    port: serverPort,
    server: {
      baseDir: root
    }
   });

   // TODO: live-reloading for demo not working yet.
   gulp.watch([srcAll, distAll, demoAll], ['reload']);
});

gulp.task('default', ['serve']);
