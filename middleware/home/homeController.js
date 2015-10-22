var OS = require('os');

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
  }

}




