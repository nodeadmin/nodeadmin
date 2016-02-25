var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var sock = require('socket.io');
var morgan = require('morgan');
var fs = require('fs');
var randomstring = require('randomstring')



// *** NodeAdmin Routers ***
var auth = require('./auth/authroutes.js');
var database = require('./database/databaseroutes.js');
var settings = require('./settings/settingsroutes.js');
var system = require('./system/systemroutes.js');
var home = require('./home/homeroutes.js');

module.exports = function nodeadmin(app, port) {
  'use strict';

  // ** Socket Connection
  var server = http.createServer(app);
  var io = sock(server);

  var expressListen = app.listen;
  app.listen = server.listen.bind(server);


  // ** Socket Controller
  require('./sockets/socketcontroller.js')(io);

  // ** Logs
  var accessLogStream = fs.createWriteStream(__dirname + '/serverlogs/access.log', {flags: 'a'});
  
    
  // ** Third party middleware
  app.use(morgan('dev', {
    stream:accessLogStream
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use('/nodeadmin', express.static(__dirname + '/public'));
  // creates secret.js with a random string if it hasn't been initialized\\
  fs.readFile('./secret.js', function(err, data) {
    if (err.code === 'ENOENT') {
      var randomString = randomstring.generate();
      var contents = "module.exports = '" + randomString + "';";
      fs.writeFileSync(__dirname + '/secret.js', contents);
    }
    var secret = require('./secret.js');
    app.locals.secret = secret;
  });
  
  // ** Routes
  app.use('/nodeadmin/api/auth', auth);
  app.use('/nodeadmin/api/db', database);
  app.use('/nodeadmin/api/settings',settings);
  app.use('/nodeadmin/api/system',system);
  app.use('/nodeadmin/api/home',home);

  // ** Middleware
  return function nodeadmin(req,res,next) {
    next();
  };


};
