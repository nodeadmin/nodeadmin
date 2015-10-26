var  mysql = require('mysql');
var client = require('../auth/clientdb.js');


module.exports = {

  getDatabases: function (req, res) {
    console.log('database is stored', req.app.locals);
  },

  connect: function (req, res) {
    client = client.getClientDB();
    client.query('SHOW DATABASES', function(err, row) {
      row && res.end(JSON.stringify(row));
    });
  },



};

