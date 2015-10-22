var mysql = require('mysql');
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
        var obj = authCtrl.authCtrl(connection);
        obj.setup(req, res);
      });
    });
};
