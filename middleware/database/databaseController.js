var  mysql = require('mysql');
var client = require('../auth/clientdb.js');



module.exports = {

  getDatabases: function (req, res) {
    console.log('database is stored', req.app.locals);
  },

  connect: function (req, res) {
    var db = client.getClientDB();
    db.query('SHOW DATABASES', function (err, row) {
      row && res.end(JSON.stringify(row));
    });
  },

  createDatabase: function (req, res) {
    var connection = client.getClientDB();
    var DatabaseName = req.body.name;
    if(DatabaseName && typeof DatabaseName === 'string' && connection.query) {
      connection.query('CREATE DATABASE ?? ', [DatabaseName], function (err, result) {
        
        if(!err) {
          res.end(null, JSON.stringify(result));
        } else {
          res.end(JSON.stringify(err), null);
        }
      });
    }
  }

};

