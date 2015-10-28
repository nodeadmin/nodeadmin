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

router.route('/:database/:table')
  .delete(DbController.dropTable)

router.route('/:database/tables')
  .get(DbController.getTables);

router.route('/:database/:table/records')
  .get(DbController.getRecords);

router.route('/performance')
  .get(DbController.getPerformanceStats);

router.route('/info')
  .get(DbController.getInfoStats);

router.route('/query')
  .post(DbController.queryClientDB);

router.route('/db')
  .get(DbController.getDatabases)

router.route('/connect')
  .get(DbController.connect)

router.route('/create')
  .post(DbController.createDatabase)


module.exports = router;
