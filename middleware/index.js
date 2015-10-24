var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var sock = require('socket.io');
var HomeController = require('./home/homeController');
var auth = require('./auth/authRoutes.js');
var database = require('./database/databaseRoutes.js');
var settings = require('./settings/settingsRoutes.js');
var system = require('./system/systemRoutes.js');
var home = require('./home/homeRoutes.js');

var io;

module.exports = function nodeadmin(app, port) {
  'use strict';
  
  // socket setup
  var server = http.createServer(app);
  io = sock(server);
  server.listen(port || 8000);

  io.sockets.on('connection', function (socket) {
    socket.emit('connected', { msg: 'You have successfully connected' });
  });

  io.of('/home').on('connection', function(socket) {
    socket.on('pressure', function(){
      setInterval(function(){
        socket.emit('memory', HomeController.getFreeMemory());
      }, 1000);
    });
  });
  
  //Third party middleware\\
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use('/nodeadmin', express.static(__dirname + '/public'));
  
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
