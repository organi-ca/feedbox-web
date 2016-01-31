var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var models = require('./models/models');

var routes = require('./routes/index');
var users = require('./routes/users');

var middlewares = require('./lib/middlewares')();

// API ROUTES
var apiUsers = require('./routes/api/users');
var apiFeedback = require('./routes/api/feedback');
var apiComment = require('./routes/api/comment');
var apiSessions = require('./routes/api/sessions');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Params define

// Define :userId params.
app.param('userId', function (req, res, next, userId) {
  req.userId = userId;
  return next();
});

app.param('feedbackId', function (req, res, next, feedbackId) {
  req.feedbackId = feedbackId;
  return next();
});
// -------------

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middlewares.crossOrigin);

app.use(function (req, res, next) {
  console.log(req.body) // populated!
  next();
})

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes api define.
app.use('/api/users/auth', apiSessions);
app.use('/api/users', middlewares.autorization, apiUsers);
app.use('/api/users/:userId/feedbacks', middlewares.autorization, apiFeedback);
app.use('/api/feedbacks/:feedbackId/comments', middlewares.autorization, apiComment);
// -------------------

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


module.exports = app;
