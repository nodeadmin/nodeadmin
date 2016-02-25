/* jshint strict: false, unused: false */

var mysql = require('mysql');
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
    if (DatabaseName && typeof DatabaseName === 'string' && connection.query) {
      connection.query('CREATE DATABASE ?? ', [DatabaseName], function (err, result) {

        if (!err) {
          res.status(201).json(result);
        } else {
          res.status(422).json(err);
        }
      });
    }
  },

  deleteDatabase: function (req, res) {
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

  getTables: function (req, res) {
    var db = req.params.database;
    var connection = client.getClientDB();

    connection.query('USE ??', [db], function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      }
      connection.query('SHOW TABLES', function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err.toString());
        } else {
          res.status(200).json(result);
        }
      });
    });
  },

  dropTable: function (req, res) {
    var db = req.params.database;
    var table = req.params.table;
    var connection = client.getClientDB();

    connection.query('USE ??', [db], function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      }
      connection.query('DROP TABLE ??', [table], function (err, result) {
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

    // ** PER FIELD
    // P_K = PRIMARY KEY, IND = INDEX, UQ = UNIQUE
    // __________________________
    // fieldName                       --> required
    // [
    //   type,                         --> required
    //   (fieldLength)                 --> optional for every type almost
    // ]
    // default                         --> constant
    // null _alias_ ([NULL, NOT NULL]) --> if !Pri_Key
    // quality [
    //          PK,                    --> only 1
    //          IND,                   -->
    //          UQ                     --> if !NULL
    // ]


    var query = 'CREATE TABLE ??.?? ( ';
    var placeholders = [].concat(database, table);

    var indexes = [];


    // loop through table field definitions
    while(schema.length) {

      // pop off field definition
      var row = schema.shift();

      // *** fieldName ***
      try {
        query+= ' ?? ';
        placeholders.push(row['fieldName']);

      } catch(e) {}

      // *** type & ([fieldLength]) ***
      try {

        var _type = row['type'];
        var _length = row['fieldLength'];

        if ( _length) {

          //  check if length is a number or string
          if(!isNaN(_length)) {
            _type += ['(', row['fieldLength'], ')'].join('');
          } else if(typeof _length === 'string') {
            // return string with placeholders and add to global query
            var enumPlaceholders =  _length.split(',').map(function (enumval, ind, arr) {
              placeholders.push(enumval);
              return '?';
            }).join(',');

            _type += ['(', enumPlaceholders , ')'].join('');
          }
        }

        query += _type.concat(' ');

      } catch (e) {}

      // *** null ***
      query += row['null'] ? 'NULL ' : 'NOT NULL ';

      // *** default ***
      if(row['default'] && row['default'] !== '') {
        if(row['default'] !== 'CURRENT_TIMESTAMP' && row['default'] !== 'NULL' ) {
          query+='DEFAULT ?';
          placeholders.push(row['default']);
        } else {
          query+= 'DEFAULT ' + row['default'].concat(' ');
        }
      }

      // *** quality ***
      if(row['quality']) {
        if( row['quality'] !== 'INDEX') {
          query += row['quality'].concat(' ');
        } else {
          indexes.push(row['fieldName']);
        }
      }

      // *** A_I ***
      if(row['auto']) {
        query += "AUTO_INCREMENT ";
      }

      // comma insertion check
      schema.length >= 1 ?  query+= ' , \n' : ' ';

    }

    // check indexes
    if(indexes.length >= 1) {
      query += ', \n ';
      query += 'INDEX('+indexes[0]+') ';
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
      sortBy = req.query.sortBy,
      sortDir = req.query.sortDir,
      limit = [offset, rowCount],
      connection = client.getClientDB();
    connection.query({
      sql: 'USE ??',
      timeout: 40000,
      values: [db]
    }, function (err, result) {
      if (err) {
        res.status(500).json(err);
      }
      connection.query('SHOW TABLES', function (err, result) {
        if (err) {
          console.log(err);
        }
        var tables = [];
        result.forEach(function(table) {
          for (var key in table) {
            tables.push(table[key]);
          }
        });

        var tableStr = '';
        if (tables.length === 1) {
          //if there is no foreign key constraints
          tableStr = '\'' + tables[0] + '\'';
        } else {
          for (var i = 0; i < tables.length; i++) {
            if (tableStr === '') {
              tableStr += '(\'' + tables[i] + '\' ';
            } else if (i === tables.length -1) {
              tableStr += 'OR \'' + tables[i] + '\')';
            } else {
              tableStr += 'OR \'' + tables[i] + '\' ';
            }
          }
        }

        if (sortBy && sortDir) {

          connection.query({
            sql: 'SELECT * FROM ?? ORDER BY ?? ' + sortDir +  ' LIMIT ?; DESCRIBE ??; SELECT count(*) FROM ??; SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_NAME=' + tableStr + ' AND TABLE_NAME=?',
            timeout: 40000,
            values: [table, sortBy, limit, table, table, table]
          }, function (err, result, fields) {
            if (err) {
              console.log(err);
            }
            res.status(200).json(result);
          });
        } else {
        connection.query({
          sql: 'SELECT * FROM ?? LIMIT ?; DESCRIBE ??; SELECT count(*) FROM ??; SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_NAME=' + tableStr + ' AND TABLE_NAME=?',
          timeout: 40000,
          values: [table, limit, table, table, table]
        }, function (err, result, fields) {
          if (err) {
            console.log(err);
          }
          res.status(200).json(result);
        });

        }
      });
    });
  },

  updateRecord: function (req, res) {
    var db = req.params.database,
      table = req.params.table,
      column = req.body.col,
      value = req.body.val,
      primaryKeyColumn = req.body.pk,
      primaryKeyValue = value[req.body.pk],
      columnValuePiars = [],
      connection = client.getClientDB();
    var str = '';
    for (var key in value) {
      str += key + ' = ' + '\'' + value[key] + '\'' + ', ';
      columnValuePiars.push(str);
    }
    str = str.substr(0, str.length - 2);
    connection.query({
      sql: 'USE ??',
      timeout: 40000,
      values: [db]
    }, function (err, result) {
      if (err) {
        res.status(500).json(err);
      }
      connection.query({
        sql: 'UPDATE ?? SET ' + str + ' WHERE ' + primaryKeyColumn + ' = ?',
        timeout: 40000,
        values: [table, primaryKeyValue]
      }, function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        }
        res.status(200).json(result);
      });
    });
  },

  addRecord: function (req, res) {
    var database = req.params.database,
      table = req.params.table,
      columns = Object.keys(req.body),
      values = [],
      connection = client.getClientDB();

    for (var key in req.body) {
      values.push(req.body[key]);
    }

    connection.query({
      sql: 'USE ??',
      timeout: 40000,
      values: [database]
    }, function (err, result) {
      if (err) {
        res.status(500).json(err);
      }
      connection.query({
        sql: 'INSERT INTO ?? (??) VALUES (?)',
        timeout: 40000,
        values: [table, columns, values]
      }, function (err, result) {
        if (err) {
          res.status(500).json(err);
        }
        res.status(201).json(result);
      });
    });
  },

  getForeignValues: function (req, res) {
    var db = req.params.database,
      table = req.params.refTable,
      column = req.params.refColumn,
      connection = client.getClientDB();
    connection.query({
      sql: 'USE ??',
      timeout: 40000,
      values: [db]
    }, function (err, result) {
      if (err) {
        console.log(err);
      }
      connection.query({
        sql: 'SELECT DISTINCT(??) FROM ??',
        timeout: 40000,
        values: [column, table]
      }, function (err, results) {
        if (err) {
          console.log(err);
        }
        res.status(201).json(results);
      });
    });
  },

  getPerformanceStats: function (req, res) {
    var db = 'performance_schema';
    var table = 'performance_timers';
    var connection = client.getClientDB();

    connection.query('SELECT * FROM ??.??', [db, table], function (err, result) {
      if (err) {
        console.log(err);
      }
      res.status(200).json(result);
    });
  },

  getInfoStats: function (req, res) {
    var db = 'information_schema';
    var table = 'processlist';
    var connection = client.getClientDB();

    connection.query('SELECT * FROM ??.??', [db, table], function (err, result) {
      if (err) {
        console.log(err);
      }
      res.status(200).json(result);
    });
  },

  queryClientDB: function (req, res) {
    var connection = client.getClientDB();

    connection.query(req.body.data.query, function (err, result) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }

};
