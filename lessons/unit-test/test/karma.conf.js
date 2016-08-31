'use strict';

module.exports = function(config) {
  config.set({
    // root of project, so /src, /dist, etc can load
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      // libs
      // src
      'src/*.js',
      // test helpers
      // tests
      'test/*.js'
    ],
    exclude: [],
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],
    // passing in via the gulp task instead
    //port: 9876
    colors: true,
    // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome', 'Firefox', 'IE'],
    browsers: ['Chrome'],
    browserNoActivityTimeout: 5000,
    // toggles continuous integration mode
    // if true, Karma captures browsers, runs the tests, then exits
    singleRun: false,
    // limit how many browsers should be started simultaneous
    concurrency: Infinity
  });
};
