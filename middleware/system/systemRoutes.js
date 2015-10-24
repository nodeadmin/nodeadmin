var express = require('express');
var router = express.Router();
var tokenCheck = require('../auth/tokenCheck.js');

router.use(tokenCheck);

router.route('/')
  .get(function(req, res){
    'use strict';
    res.send('eyyyy in system');
  });

module.exports = router;

