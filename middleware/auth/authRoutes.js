var express = require('express');
var router = express.Router();
// var Promise = require("bluebird");
var mysql = require('promise-mysql');
var authCtrl = require('./authCtrl');
var connection;
router.route('/setup')
  .get(function (req, res) {
    res.send('eyyyy in auth');
  })
  .post(function (req, res) {
    mysql.createConnection({
      host: req.body.host,
      user: req.body.mysqlUser,
      password: req.body.mysqlPassword
    }).then(function(conn) {
        connection = conn;
        var obj = authCtrl.authCtrl(conn);
        obj(req, res);
    }).catch(function (e) {
      console.log(e);
      if(e.errno === 1045) {
        res.status(500).json({error: 'We couldn\'t connect to the host with the credentials you provided. Please try again.'});
      } else if (e.errno === 'ENOTFOUND') {
        res.status(500).json({error: 'We couldn\'t find the host that you provided. Double check to make sure you typed it in correctly and try again.'});
      } else {
        res.status(500).json({error: 'something broke.'});
      }
    });
  });
router.route('/dbcheck')
  .get(function(req, res) {
    connection.query('SHOW DATABASES')
      .then(function (results) {
        results.forEach(function (result) {
          if (result.Database === 'nodeAdmin') {
            res.send(true);
          }
        });
        res.send(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
router.route('/login')
.post(function (req, res) {
  var user = req.body.username;
  var pass = req.body.pass;

})
module.exports = router;
