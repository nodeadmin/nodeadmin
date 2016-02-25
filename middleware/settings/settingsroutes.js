var express = require('express');
var router = express.Router();
var tokenCheck = require('../auth/tokencheck.js');
var SettingsController = require('./settingscontroller.js');

router.use(tokenCheck);


router.route('/users')
  .get(SettingsController.getUsers)
  .post(SettingsController.addUser);

router.route('/users/:user/:host')
  .put(SettingsController.editUser)
  .delete(SettingsController.deleteUser);

// 'SHOW GRANTS' per user
router.route('/users/:user/:host/grants')
  .get(SettingsController.getGrants);

// Get grants record per user for editing
router.route('/users/:user/:host/grantsrecord')
  .get(SettingsController.getGrantsRecord)
  .put(SettingsController.editGrantsRecord);

router.route('/users/grantsdescription')
  .get(SettingsController.getGrantsDescription);

module.exports = router;

