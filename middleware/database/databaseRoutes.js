var express = require('express');
var router = express.Router();
var tokenCheck = require('../auth/tokenCheck.js');
var mysql = require('mysql');
var connection = mysql.createConnection({
  user: 'root',
  password: 'babka'
});
//router.use(tokenCheck);

router.route('/')
.get(function(req, res){
  'use strict';
  res.send('eyyyy in db');
});

router.route('/:database/:table/records')
.get(function(req, res) {
  var db = req.params.database,
    table = req.params.table;

  connection.query('USE ' + db, function (err, result) {
    if (err) {
      console.log(err);
    } 
    connection.query('SELECT * FROM ' + table, function (err, result) {
      if (err) {
        console.log(err);
      } 

      res.status(200).json(result);
    });
  });
});

module.exports = router;
