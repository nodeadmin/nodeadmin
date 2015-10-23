var OS = require('os');
var spawn = require('child_process').spawn;

module.exports = {

  getHostname:function(callback) {
    return callback(null, OS.hostname());
  },

  getType:function(callback) {
    return callback(null, OS.type());
  },

  getUptime:function(callback) {
    return callback(null, OS.uptime())
  },

  getLoadAvg:function(callback) {
    return callback(null, OS.loadavg());
  },

  getTotalMemory: function(callback) {
    return callback(null, OS.totalmem());
  },

  getFreeMemory: function(callback) {
    return OS.freemem();
  }

}




