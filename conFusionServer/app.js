var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter  = require('./routes/dishRouter');
var leaderRouter  = require('./routes/leaderRouter');
var promoRouter  = require('./routes/promoRouter');

var mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);


connect.then((db) => {
  console.log('Connected to database mongdb');
})

function auth(req, res, next) {
  console.log(req.signedCookies);
  if(!req.signedCookies.user) {
    var authHeader = req.headers.authorization;
    console.log(authHeader);
    if(!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
  }

  // ' ' for Basic base64Encodding
  // colon to seprate user name and password
  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var username = auth[0];
  var password = auth[1];
  console.log(username, password);
  if(username == 'admin' && password == 'password') {
    res.cookie('user', 'admin', {signed: true});
    next();
  } else {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}
  else {
    console.log(req.signedCookies.user);
    if(req.signedCookies.user == 'admin') {
      next();
    } else {
      var err = new Error('You are not authenticated!');
      
      err.status = 401;
      return next(err);
    }
  }
}

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Removing cookie for using sessions.
//app.use(cookieParser('12345-67890-09876-12345'));
//app.use(auth);

app.use(session({
  name: 'session-id',
  secret: '12345=67890-09876-12345',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth_session(req, res, next) {
  console.log(req.signedCookies);
  if(!req.session.user) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 403;
      return next(err);
  }
/*
  // ' ' for Basic base64Encodding
  // colon to seprate user name and password
  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var username = auth[0];
  var password = auth[1];
  console.log(username, password);
  if(username == 'admin' && password == 'password') {
    req.session.user = 'admin';
    next();
  } else {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}*/
  else {
    console.log(req.session.user);
    if(req.session.user == 'authenticated') {
      next();
    } else {
      var err = new Error('You are not authenticated!');
      
      err.status = 403;
      return next(err);
    }
  }
}

app.use(auth_session);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promo', promoRouter);
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
