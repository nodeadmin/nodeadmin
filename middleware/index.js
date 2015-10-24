var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var sock = require('socket.io');
var morgan = require('morgan');
var HomeController = require('./home/homeController');
var auth = require('./auth/authRoutes.js');
var database = require('./database/databaseRoutes.js');
var settings = require('./settings/settingsRoutes.js');
var system = require('./system/systemRoutes.js');
var home = require('./home/homeRoutes.js');
var fs = require('fs');
var spawn = require('child_process').spawn;

var io;
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

module.exports = function nodeadmin(app, port) {
  'use strict';

  // socket setup


  app.use(morgan('combined', {
    stream:accessLogStream
  }));
  

  var server = http.createServer(app);
  io = sock(server);
  server.listen(port || 8000);
  
  io.of('/system').on('connection', function (socket) {
    socket.on('getlogs', function () {
      var ls = spawn('tail', ['-f', __dirname + "/access.log"]);

      ls.stdout.on('readable', function() {
        var asMessage = this.read().toString();
        socket.emit('logs', asMessage);
      });  
    });
    socket.on('stoplogs', function () {
      ls.kill();
      fs.truncate(__dirname + '/access.log');
    });

  });

  


  io.on('connection', function (socket) {
    socket.emit('something', {data: 'you connected, yo!'});
  });

  io.of('/home').on('connection', function(socket) {
    socket.on('pressure', function(){
      setInterval(function(){
        socket.emit('memory', HomeController.getFreeMemory());
      }, 5000);
    });
    socket.on('clientcpu', function(){
      setInterval(function(){
        socket.emit('servercpu', HomeController.getCpus());
      }, 2000);
    });
  });
  
  //Third party middleware\\

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use('/nodeadmin', express.static(__dirname + '/public'));
  app.locals.secret = 'Rwue0IHNM563p0Aa50dcsO8qxeZNFYr9';
  
  //Routes\\
  app.use('/nodeadmin/api/auth', auth);
  app.use('/nodeadmin/api/db', database);
  app.use('/nodeadmin/api/settings',settings);
  app.use('/nodeadmin/api/system',system);
  app.use('/nodeadmin/api/home',home);
  app.use('/nodeadmin/', function(req,res){
    res.send('hello');
  });

  //middleware\\

  return function nodeadmin(req,res,next) {
    next();
  };


};
