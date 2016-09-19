var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// request the routers
var routes = require('./routes/index');
var users = require('./routes/users');
var todos = require('./routes/todos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// grab urls and pass them to the appropriate routers for handling
app.use('/', routes);
app.use('/users', users);
app.use('/todos', todos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.all('*', function(req, res, next) {
  console.log('All handler....');
  next();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// var port = 3000;
// app.listen(port, function() {
//   console.log('Hello World with express, listening on port ' + port);
// });

module.exports = app;

// express 4 API:
// - http://expressjs.com/en/api.html
//
// express getting started/generator
// - https://expressjs.com/en/starter/generator.html
//
// serve the app:
// - npm start
// - where "start" is defined in the package.json file
//   and takes care of getting the express app up and running
//
// change the port?
// - PORT=3001 npm start
// - set the env vars first, these will be used by npm
//
// now, to build an API
// - https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// - https://gist.github.com/iksose/9401758
// - https://devcenter.heroku.com/articles/mean-apps-restful-api
