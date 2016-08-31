'use strict';

var gulp = require('gulp'),
    // gutil = require('gulp-util'),
    // jshint = require('gulp-jshint'),
    KarmaServer = require('karma').Server;






gulp.task('test-unit', function(done) {
    new KarmaServer({
      configFile:  __dirname + '/test/karma.conf.js',
      port: 9005
      // browsers: ['PhantomJS'] - try the firefox default?
    }, done).start();
});








// all we doing this time is running unit tests
gulp.task('default', ['test-unit']);
