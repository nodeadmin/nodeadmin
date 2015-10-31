var express = require('express');
var router = express.Router();
var tokenCheck = require('../auth/tokenCheck.js');
var SettingsController = require('./settingsController.js');

router.use(tokenCheck);

router.route('/')
  .get(function(req, res){
    'use strict';
    res.send('eyyyy in settings');
  });

router.route('/users')
  .get(SettingsController.getUsers)
  .post(SettingsController.addUser)
  // TODO: move PUT to /users/:user/:host
  .put(SettingsController.editUser);

router.route('/users/:user/:host')
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

