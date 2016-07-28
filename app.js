var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//  server Mongo
////////////////////
var mongoose = require('mongoose');
mongoose.connect('localhost','test');
var schema = new mongoose.Schema({
  name: String,
  value: String,
  updated_time: { type: Date, default: Date.now },
});
var db = mongoose.model('db', schema);
// var db = new dbmodel({name: 'First', value: '1'})
// db.save(function(err){
//   if (err)
//     console.log(err);
//   else 
//     console.log(db);
// });

// db.create({name: 'First', value: '1'}, function (err, small) {
//   if (err) 
//     return handleError(err);
//   // saved!
// })
// db.create({name: 'Second', value: '2'}, function (err, small) {
//   if (err) 
//     return handleError(err);
//   // saved!
// })
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // next(err);
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

app.post('/api/post', function(req,res){
  console.log("test vo api");
  console.log(req.body);

  var abd = new db({
    name : "test",
    value : req.body.input
  });
  abd.save(function(err,data){});
  res.send("OK");
});

app.get('/api/get', function(req, res) {
console.log("into get");
  db.findOne({},function(err,db){
    console.log(db);
    res.json(db);
  });
});


// app.listen(3000, function () {
//   console.log('Ready');
// });
module.exports = app;
