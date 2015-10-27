var express = require('express');
var router = express.Router();
var tokenCheck = require('../auth/tokenCheck.js');
var getClientDB = require('../auth/clientdb.js').getClientDB;
var DbController = require('./databaseController.js');
var mysql = require('mysql');

router.use(tokenCheck);

router.route('/')
  .get(function(req, res) {
    'use strict';
    res.send('eyyyy in db');
  });

router.route('/:database/tables')
  .get(function(req, res) {
    var db = req.params.database;
    connection = getClientDB();

    connection.query('USE ' + db, function(err, result) {
      if (err) {
        console.log(err);
      }
      connection.query('SHOW TABLES', function(err, result) {
        if (err) {
          console.log(err)
        }
        res.status(200).json(result);
      });
    });
  });

router.route('/:database/:table/records')
  .get(function(req, res) {
    var db = req.params.database,
      table = req.params.table;
      connection = getClientDB();

    connection.query('USE ' + db, function(err, result) {
      if (err) {
        console.log(err);
      }
      connection.query('SELECT * FROM ' + table, function(err, result) {
        if (err) {
          console.log(err);
        }

        res.status(200).json(result);
      });
    });
  });

router.route('/db')
  .get(DbController.getDatabases)

router.route('/connect')
  .get(DbController.connect)

module.exports = router;
