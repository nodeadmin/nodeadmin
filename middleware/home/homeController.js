var OS = require('os');

module.exports = {

  getHostname:function(_ , callback) {
    return callback(null, OS.hostname());
  },

  getType:function(_, callback) {
    return callback(null, OS.type());
  },

  getUptime:function(_, callback) {
    return callback(null, OS.uptime())
  }

}




