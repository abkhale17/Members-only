/////// app.js

const express = require("express");
const app = express();
const path = require("path");
var createError = require('http-errors');
const bodyParser = require('body-parser')
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
var logger = require('morgan');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
var pug = require('pug')
var User = require('./models/user')
const flash = require('connect-flash')


require('dotenv').config()

var indexRouter = require('./routes/index')

var mongoDb = process.env.MONGODB_URI
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(flash())
app.use(function (req, res, next) {
  res.locals.errors = req.flash('error')
  res.locals.successes=req.flash('success')
  next();
});
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      };
      if (!user) {
        return done(null, false, { msg: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
      	if(result) {
      		return done(null, user);
      	} else {
      		return done(null, false, {msg: "Incorrect password"})
      	}
      })
      
    });
  })
);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);

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
app.listen(process.env.PORT || 5000)
module.exports = app

