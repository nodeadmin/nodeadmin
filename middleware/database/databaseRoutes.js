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
  var connection = getClientDB();

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
    var connection = getClientDB();

    connection.query('USE ' + db, function(err, result) {
      if (err) {
        console.log(err);
      }
      connection.query('SELECT * FROM ' + table + '; DESCRIBE ' + table, function(err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result);
        res.status(200).json(result);
      });
    });
  });

router.route('/performance')
.get(function (req, res) {
  var db = 'performance_schema';
  var table = 'performance_timers';
  var connection = getClientDB();

  connection.query('USE ' + db, function (err, result) {
    if (err) {
      console.log(err);
    }
    connection.query('SELECT * FROM ' + table, function (err, result) {

      res.status(200).json(result);
    });
  });
});

router.route('/info')
.get(function (req, res) {
  var db = 'information_schema';
  var table = 'processlist'
  var connection = getClientDB();

  connection.query('SELECT * FROM ' + db + '.' + table, function (err, result) {
    if (err) {
      console.log(err);
    }
    res.status(200).json(result);
  });
});

router.route('/query')
.post(function (req, res) {
  var connection = getClientDB()

  connection.query(req.body.data.query, function (err, result) {
    if (err) {
      console.log(err, result);
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

router.route('/db')
  .get(DbController.getDatabases)

router.route('/connect')
  .get(DbController.connect)

router.route('/create')
  .post(DbController.createDatabase)


module.exports = router;
