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
  .put(SettingsController.editUser);

router.route('/users/:user/:host')
  .get(SettingsController.getGrants);

module.exports = router;

