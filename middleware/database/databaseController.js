/* jshint strict: false, unused: false */

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
  },

  updateRecord: function (req, res) {
    var db = req.params.database, 
      table = req.body.table,
      column = req.body.col,
      value = req.body.val,
      primaryKey = req.body.pk;

    var raw = 'UPDATE ' + table + ' SET ' + column + '="' + value + '" WHERE ' + primaryKey + '="PRIMARY KEY"';
    var connection = getClientDB();

    connection.query('USE ' + db, function(err, result) {
      if (err) {
        console.log(err);
      }
      connection.query(raw, function(err, result) {
        console.log(result);
        if (err) {
          console.log(err);
        }
        res.status(200).json(result);
      });
    });
  } 

};

