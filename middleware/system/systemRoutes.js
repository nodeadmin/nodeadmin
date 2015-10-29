var express = require('express');
var router = express.Router();
var tokenCheck = require('../auth/tokenCheck.js');
var SystemController = require('./systemController.js');

router.use(tokenCheck);

router.route('/modules')
  .get(SystemController.getNpmModules);

router.route('/filesystem')
  .get(SystemController.getModuleChildren);

module.exports = router;
