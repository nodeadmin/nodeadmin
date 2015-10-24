var mysql = require('promise-mysql');
var Promise = require("bluebird");
var authCtrl = require('./authCtrl');

module.exports = function (router) {
  'use strict';

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
          req.app.locals.connection = conn;
          var obj = authCtrl.authCtrl(conn);
          obj(req, res);
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).json({error: err});
      });
    });
  router.route('/dbcheck')
    .get(function(req, res) {
      var connection = req.app.locals.connection;
      connection.query('SHOW DATABASES', function (err, results) {
        if (err) {
          console.log(err);
        }
        results.forEach(function (result) {
          if (result.Database === 'nodeAdmin') {
            res.send(true);
          }
        });

        res.send(false);
      });
    });
};
