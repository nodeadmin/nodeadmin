
/*jshint unused:false*/

var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var hash = Promise.promisify(require('bcrypt').hash);
module.exports.authCtrl = function (connection) {
  'use strict';
  return function (req, res) {
		var queries = {
		        databaseTable: 'CREATE TABLE db (id INT NOT NULL AUTO_INCREMENT, mysql_user VARCHAR(255) NOT NULL, mysql_password VARCHAR(255), mysql_host VARCHAR(255) NOT NULL, PRIMARY KEY (id))',
		        usersTable: 'CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, display_name VARCHAR(255),     database_id INT NOT NULL, password VARCHAR(255) NOT NULL, notification1 BOOL, PRIMARY KEY (id), FOREIGN KEY (database_id) REFERENCES db(id))',
		        insertDB: 'INSERT INTO db (mysql_user, mysql_password, mysql_host) VALUES ("' + req.body.mysqlUser + '", "' + req.body.mysqlPassword + '", "' + req.body.host + '")',
		        dbId: 'SELECT id FROM db WHERE mysql_user = "' + req.body.mysqlUser + '"'
    };
    app.set = ('secret', 'Rwue0IHNM563p0Aa50dcsO8qxeZNFYr9');
    connection.query('SHOW DATABASES')
      .then(function (result) {
        result.forEach(function (row) {
          if (row.Database === 'nodeAdmin') {
            res.send(true);
          }
        });
        return connection.query('CREATE DATABASE nodeAdmin');
      })
      .then(function (result) {
        return connection.query('USE nodeAdmin');
      })
      .then(function (result) {
        return connection.query(queries.databaseTable);
      })
      .then(function (result) {
        return connection.query(queries.usersTable);
      })
      .then(function (result) {
        return connection.query(queries.insertDB);
      })
      .then(function(result) {
        return hash(req.body.password, 10);
      })
      .then(function (result) {
        queries.insertUser = 'INSERT INTO users (username, password, database_id) VALUES ("' + req.body.username + '", "' + result + '", "' + 1 + '")';
        return connection.query(queries.insertUser);
      })
      .then(function (result) {
        var token = jwt.sign({username: req.body.username}, app.get('secret'));
				res.status(200).json({token: token});
      })
      .catch(function(e) {
        console.error(e);
        res.status(500).send(e);
      });

	};
};
