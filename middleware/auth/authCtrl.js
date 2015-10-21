/*jshint unused:false*/

'use strict';


var Promise = require('bluebird');
var query = Promise.promisify(connection.query);
var queries = {
  databaseTable: 'CREATE TABLE database (id INT NOT NULL AUTO_INCREMENT, mysql_user NOT NULL VARCHAR(255), mysql_password NOT NULL VARCHAR(255), mysql_host NOT NULL VARCHAR(255), PRIMARY KEY (id))',
  usersTable: 'CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, display_name VARCHAR(255), database_id INT NOT NULL, password NOT NULL VARCHAR(255), notification1 BOOL, PRIMARY KEY (id), FOREIGN KEY (database_id) REFERENCES database(id))',
  insertDB: 'INSERT INTO database (mysql_user, mysql_password, mysql_host) VALUES ("' + req.body.mysqlUser + '", "' + req.body.mysqlPassword + '", "' + req.body.host + '")',
  dbId: 'SELECT id FROM database WHERE mysql_user = "' + req.body.mysqlUser + '"'
};


module.exports.authCtrl = function (connection) {
  return {
    setup: function (req, res) {

      req.app.set('connection', connection);

      query('SHOW DATABASES')
        .then(function (result) {
          result.each(function (row) {
            if (row.Database === 'nodeAdmin') {
              res.send(true);
            }
          });
          return query('CREATE DATABASE nodeAdmin');
        })
        .then(function (result) {
          return query('USE nodeAdmin');
        })
        .then(function (result) {
          return query(queries.databaseTable);
        })
        .then(function (result) {
          return query(queries.usersTable);
        })
        .then(function (result) {
          return query(queries.insertDB);
        })
        .then(function (result) {
          return query(queries.dbId);
        })
        .then(function (result) {
          queries.insertUser = 'INSERT INTO users (username, password, database_id) VALUES ("' + req.body.username + '", "' + req.body.password + '", "' + req.body.db + '"' + result[0] + '")';
          return query(queries.insertUser);
        })
        .then(function (result) {
          res.send(200);
        })
        .catch(function(e) {
          console.error(e);
        });
      }
  };
}







    connection.query('CREATE DATABASE nodeAdmin', function (err, result) {
      if (err) {
        errorHandler(err);
      }
      connection.query('USE nodeAdmin', function (err, result) {
        if (err) {
          errorHandler(err);
        }
        connection.query(queries.databaseTable, function (err, result) {
          if (err) {
            errorHandler(err);
          }
          connection.query(queries.usersTable, function (err, result) {
            if (err) {
              errorHandler(err);
            }
            connection.query(queries.insertDB, function (err, result) {
              if (err) {
                errorHandler(err);
              }
              connection.query(queries.dbId, function (err, result) {
                if (err || !result) {
                  errorHandler(err);
                }
                queries.insertUser = 'INSERT INTO users (username, password, database_id) VALUES ("' + req.body.username + '", "' + req.body.password + '", "' + req.body.db + '"' + results[0] + '")';
                connection.query(queries.insertUser, function (err, result) {
                  if (err) {
                    errorHandler(err);
                  }
                  res.send(200);
                });
              });
            });
          });
        });
      });
    });
