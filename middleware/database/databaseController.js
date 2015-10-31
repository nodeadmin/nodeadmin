/* jshint strict: false, unused: false */

var mysql = require('mysql');
var client = require('../auth/clientdb.js');

var bindFieldLength = function(type, val) {
  return type+'('+val+')';
};


module.exports = {

  getDatabases: function(req, res) {
    console.log('database is stored', req.app.locals);
  },

  connect: function(req, res) {
    var db = client.getClientDB();
    db.query('SHOW DATABASES', function(err, row) {
      row && res.end(JSON.stringify(row));
    });
  },

  createDatabase: function(req, res) {
    var connection = client.getClientDB();
    var DatabaseName = req.body.name;
    if (DatabaseName && typeof DatabaseName === 'string' && connection.query) {
      connection.query('CREATE DATABASE ?? ', [DatabaseName], function(err, result) {

        if (!err) {
          res.status(200).json(result);
        } else {
          res.status(422).json(err);
        }
      });
    }
  },

  deleteDatabase: function(req, res) {
    var connection = client.getClientDB();
    var DatabaseName = req.body.name;

    if (DatabaseName && typeof DatabaseName === 'string' && connection.query) {
      connection.query('DROP DATABASE ?? ', [DatabaseName], function (err, result) {

        if (!err) {
          res.end(null, JSON.stringify(result));
        } else {
          res.end(JSON.stringify(err), null);
        }
      });
    }
  },

  getTables: function(req, res) {
    var db = req.params.database;
    var connection = client.getClientDB();

    connection.query('USE ??', [db], function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      }
      connection.query('SHOW TABLES', function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err.toString());
        } else {
          res.status(200).json(result);
        }
      });
    });
  },

  dropTable: function(req, res) {
    var db = req.params.database;
    var table = req.params.table;
    var connection = client.getClientDB();

    connection.query('USE ??', [db], function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      }
      connection.query('DROP TABLE ??', [table], function(err, result) {
        if (err) {
          console.log(err);
          // Displays human-readable errors
          res.status(500).send(err.toString());
        } else {
          res.status(200).send(table);
        }
      });
    });
  },

  createTable: function(req, res) {
    var connection = client.getClientDB();
    var database = req.params.database;
    var table = req.params.table;
    var schema = req.body;


    var query = 'CREATE TABLE ??.?? ( ';
    var placeholders = [].concat(database, table);

    // loop through table field definitions
    while(schema.length) {

      // pop off field definition
      var row = schema.shift();

      for( var prop in row ) {

        switch(prop) {
        case 'fieldName':
          placeholders.push(row[prop]);
          query+= ' ?? '
          break;
        case 'type':
          // currently this wont work for types with an associated length
          var _type = row['fieldLength'] 
          ? bindFieldLength(row[prop],row['fieldLength']) 
          : row[prop];

          query+= _type.concat(' ');
          break;
        case 'default':
          // this just straight up isnt implmented yet
          query+= ' ?? ';
          break;
        case 'quality':
          query+= row[prop].concat(' ');
          break;
        case 'auto':
          query+= 'AUTO_INCREMENT'.concat(' ');
          break;
        case 'null':
          query+= row[prop].concat(' ');
          break;
        case 'fieldLength':
          // ignore fieldlength and apply to type
          break;
        default:
          // client is intentionally sql injecting
          res.status(200).end('<h2>!por que?</h2>');
        }
      }
      // last line in query cannot have comma
      schema.length >= 1 ?  query+= ' , \n' : ' ';
    }

    // close query statement
    query+= ')';

    connection.query(query, placeholders, function (err, result, fields) {
      if(err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(result);
      }
    })
  },

  getRecords: function(req, res) {
    var db = req.params.database,
      table = req.params.table,
      rowCount = 100, //Shouldn't be hardcoded, need to add a query to get request, but this will do for now
      offset = req.params.page > 1 ? req.params.page * rowCount : 0,
      limit = [offset, rowCount],
      connection = client.getClientDB();
    connection.query({
      sql:'USE ??',
      timeout: 40000,
      values: [db]
    }, function(err, result) {
      if (err) {
        console.log(err);
      }
      connection.query({
        sql: 'SELECT * FROM ?? LIMIT ?; DESCRIBE ??; SELECT count(*) FROM ??',
        timeout: 40000,
        values: [table, limit, table, table]
      }, function(err, result, fields) {
        if (err) {
        }
        res.status(200).json(result);
      });
    });
  },

  updateRecord: function (req, res) {
    var db = req.params.database, 
      table = req.body.table,
      column = req.body.col,
      value = req.body.val,
      set = {},
      primaryKey = req.body.pk,
      connection = client.getClientDB();

    set[column] = value;
    connection.query({
      sql:'USE ??',
      timeout: 40000,
      values: [db]
    }, function(err, result) {
      if (err) {
        console.log(err);
      }
      connection.query({
        sql: 'UPDATE ?? SET ? WHERE ?? = "PRIMARY KEY"',
        timeout: 40000,
        values: [table, set, primaryKey]
      }, function(err, result) {
        if (err) {
          console.log(err);
        }
        res.status(200).json(result);
      });
    });
  },
  
  getPerformanceStats: function(req, res) {
    var db = 'performance_schema';
    var table = 'performance_timers';
    var connection = client.getClientDB();

    connection.query('SELECT * FROM ??.??', [db, table], function(err, result) {
      if (err) {
        console.log(err);
      }
      res.status(200).json(result);
    });
  },

  getInfoStats: function(req, res) {
    var db = 'information_schema';
    var table = 'processlist'
    var connection = client.getClientDB();

    connection.query('SELECT * FROM ??.??', [db, table], function(err, result) {
      if (err) {
        console.log(err);
      }
      res.status(200).json(result);
    });
  },

  queryClientDB: function(req, res) {
    var connection = client.getClientDB()

    connection.query(req.body.data.query, function(err, result) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }

};
