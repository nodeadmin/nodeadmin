var express = require('express');
var router = express.Router();
var tokenCheck = require('../auth/tokencheck.js');
var SystemController = require('./systemcontroller.js');

router.use(tokenCheck);

router.route('/modules')
  .get(SystemController.getNpmModules);

module.exports = router;
