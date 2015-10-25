
var express = require('express');
var router = express.Router();
var tokenCheck = require('../auth/tokenCheck.js');
var DbController = require('./databaseController.js');


router.use(tokenCheck);

  router.route('/')
    .get(function(req, res){
      'use strict';
      res.send('eyyyy in db');
    });

  router.route('/db')
    .get(DbController.getDatabases)

  router.route('/connect')
    .get(DbController.connect)

module.exports = router;


