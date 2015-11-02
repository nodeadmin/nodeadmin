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
      return {query: function(){ console.error('Error: Attempted to query, but there is no connection to database.') } };
    } else {
      return connection;
    }

  }
};
