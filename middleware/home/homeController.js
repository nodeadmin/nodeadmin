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
  }

}




