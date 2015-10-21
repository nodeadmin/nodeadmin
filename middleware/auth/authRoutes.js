var mysql = require('mysql');
var Promise = require("bluebird");
module.exports = function (router) {
  'use strict';

  router.route('/')
    .get(function (req, res) {
      res.send('eyyyy in auth');
    })
    .post(function (req, res) {
      var connection = mysql.createConnection({
        host: req.body.host,
        user: req.body.user,
        password: req.body.password
      });

      var authCtrl = require('./authCtrl')(connection);
      connection.connect(function (err) {
        if (err) {
          console.log(err);
          return;
        }
        authCtrl.setup(connection);
      });
    });
};
