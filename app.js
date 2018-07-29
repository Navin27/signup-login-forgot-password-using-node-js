var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var jwt = require('jsonwebtoken');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/signup')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signup = require('./routes/signup');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signup);
app.use('/login', signup);
app.use('/forgotpsd', signup);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// acces token handler
// app.use(function(req, res, next) {
//   var token = req.cookies.auth;
//   console.log(token);
//   // decode token
//   if (token) {
//     jwt.verify(token, config.secret, function(err, token_data) {
//       if (err) {
//          return res.status(403).send('Error');
//       } else {
//         req.user_data = token_data;
//         next();
//       }
//     });
//   } else {
//     return res.status(403).send('No token');
//   }
// });


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
