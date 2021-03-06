var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var session =  require("express-session");
var passport = require("passport");
var flash = require("connect-flash")
var router = require('./routes/index');
var userRouter = require('./routes/user');
var mongoose = require("mongoose");
var app = express();
var validator = require('express-validator');

mongoose.connect('mongodb://localhost:27017/shopping');
require('./config/passport');
// view engine setup
//engine name: '.hbs'
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({secret: 'mysupersupersecret', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

app.use('/user', userRouter);
app.use('/', router);
// this if put on first all the request will be sent to it
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
