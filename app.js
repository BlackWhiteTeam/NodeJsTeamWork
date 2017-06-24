var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./data/user-data');
var index = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/libs', express.static(__dirname + '/node_modules'));

app.use('/', index);
app.use('/register', userRouter);
module.exports = app;
