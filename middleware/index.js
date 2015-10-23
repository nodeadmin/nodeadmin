var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var sock = require('socket.io');
var HomeController = require('./home/homeController');

var io = undefined;

module.exports = function nodeadmin(app, express, port) {
  // socket setup
  var server = http.createServer(app);
  io = sock(server);
  server.listen(port || 8000);

  io.of('/system').on('connection', function (socket) {
    console.log('I sent some sturf');
  });
  io.on('connection', function (socket) {
    socket.emit('something', {data: "you connected, yo!"});
  });

  io.of('/home').on('connection', function(socket) {
    socket.on('pressure', function(){
      setInterval(function(){
        socket.emit('memory', HomeController.getFreeMemory());
      }, 1000);
    });

    socket.on('clientcpu', function(){
      setInterval(function(){
        socket.emit('servercpu', HomeController.getCpus());
      }, 2000);
    });
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/nodeadmin', express.static(__dirname + '/public'));

  var databaseRouter = express.Router();
  require('./database/databaseRoutes.js')(databaseRouter);
  app.use('/nodeadmin/api/db', databaseRouter);

  var settingsRouter = express.Router();
  require('./settings/settingsRoutes.js')(settingsRouter);
  app.use('/nodeadmin/api/settings',settingsRouter);

  var systemRouter = express.Router();
  require('./system/systemRoutes.js')(systemRouter);
  app.use('/nodeadmin/api/system',systemRouter);

  var homeRouter = express.Router();
  require('./home/homeRoutes.js')(homeRouter);
  app.use('/nodeadmin/api/home',homeRouter);

  var authRouter = express.Router();
  require('./auth/authRoutes.js')(authRouter);
  app.use('/nodeadmin/api/auth',authRouter);

  app.use('/nodeadmin/', function(req,res,next){
    res.send('hello');

  });

  return function nodeadmin(req,res,next) {
      next();
  }
  

};
