/////// app.js

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
var logger = require('morgan');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
require('dotenv').config()


var mongoDb = process.env.MONGODB_URI
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));


const app = express();

// app.set("views", path.join(__dirname, 'views'));
// app.set("view engine", "pug");
app.get('/', (req,res)=> res.send('he;;ll'))
app.use(logger('dev'));
app.listen(3000, () => console.log("app listening on port 3000!"));

