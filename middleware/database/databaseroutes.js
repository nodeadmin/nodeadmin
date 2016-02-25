/* jshint strict: false, unused: false */
var router = require('express').Router();
var tokenCheck = require('../auth/tokencheck.js');
var DbController = require('./databasecontroller.js');

// require token for all database operations
router.use(tokenCheck);

// foreign keys
router.route('/:database/fk/:refTable/:refColumn')
  .get(DbController.getForeignValues);  

// create and drop table
router.route('/:database/:table')
  .delete(DbController.dropTable)
  .post(DbController.createTable);

// database table
router.route('/:database/tables')
  .get(DbController.getTables);

// subset of table
router.route('/:database/:table/:page')
  .get(DbController.getRecords)
  .put(DbController.updateRecord)
  .post(DbController.addRecord);  

// database performance
router.route('/performance')
  .get(DbController.getPerformanceStats);

// database info
router.route('/info')
  .get(DbController.getInfoStats);

// run query
router.route('/query')
  .post(DbController.queryClientDB);

// *** return mysql databases
router.route('/db')
  .get(DbController.getDatabases);

router.route('/connect')
  .get(DbController.connect);

// create datase
router.route('/create')
  .post(DbController.createDatabase);

// drop database
router.route('/delete')
  .post(DbController.deleteDatabase)


module.exports = router;
