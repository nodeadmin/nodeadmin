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
      console.log('there has been a post request to /auth/setup.');
      console.log('req.body in authroutes: ', req.body)
      var connection = mysql.createConnection({
        host: req.body.host,
        user: req.body.mysqlUser,
        password: req.body.mysqlPassword
      });
      console.log('Connection has been created and is as follows: ' + connection);

      connection.connect(function (err) {
        if (err) {
          console.log(err);
          return;
        }
        req.app.locals.connection = connection;
        var obj = authCtrl.authCtrl(connection);
        obj(req, res);
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
