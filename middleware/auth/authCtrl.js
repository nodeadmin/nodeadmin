
/*jshint unused:false*/

var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var hash = Promise.promisify(require('bcrypt').hash);

module.exports.authCtrl = function (connection) {
  'use strict';
  return function (req, res) {
		var queries = {
    };
   
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
      })
      .catch(function(e) {
        console.error(e);
        res.status(500).json({error: e});
      });

	};
};
