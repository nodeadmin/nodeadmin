var spawn = require('child_process').spawn;
var HomeController = require('../home/homeController');
var fs = require('fs');
var ls;

module.exports = function (io) {
  io.of('/system').on('connection', function (socket) {
    socket.on('getlogs', function () {
      ls = spawn('tail', ['-f', __dirname + "/../serverLogs/access.log"]);
      ls.stdout.on('readable', function() {
        var asMessage = this.read().toString();
        socket.emit('logs', asMessage);
      });  
    });
    socket.on('stoplogs', function () {
      ls.removeListener('readable', function () {
        ls.kill();
      });
      fs.truncate(__dirname + '/../serverLogs/access.log');
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

}
