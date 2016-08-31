'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    KarmaServer = require('karma').Server;

var root = './',
    src = './src/',
    testRelative = '/test/';

var protocol = 'http://',
    host = 'localhost',
    serverPort = 9005,
    baseUrl = protocol + host + ':' + serverPort;
		

gulp.task('test-unit', function(done) {
    new KarmaServer({
      configFile:  __dirname  + testRelative + 'karma.conf.js',
      port: serverPort
      // browsers: ['PhantomJS'] - try the firefox default?
    }, done).start();
});

// all we doing this time is running unit tests
gulp.task('default', ['test-unit']);
