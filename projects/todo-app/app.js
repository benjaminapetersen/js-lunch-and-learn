var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// request the routers
var routes = require('./routes/index');
var todos = require('./routes/todos');
var api_todos = require('./routes/api/todos');


var app = express();
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// grab urls and pass them to the appropriate routers for handling
app.use('/', routes);
app.use('/todos', todos);
app.use('/api/todos', api_todos);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// catch other errors and render out an error page
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.all('*', function(req, res, next) {
  console.log('All handler....');
  next();
});

module.exports = app;
