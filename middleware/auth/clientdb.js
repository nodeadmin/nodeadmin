var jwt = require('jsonwebtoken');
var connection = undefined;

module.exports = {
  bindClientDB:function(db) {
    if(db) {
      connection = db;
    }

  },
  getClientDB:function() {
    if(!connection) {
    } else {
      return connection;
    }

  }
};
