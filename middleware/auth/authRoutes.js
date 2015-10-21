var mysql = require('mysql');
var authCtrl = require('./authCtrl')(connection);
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

      connection.connect(function (err) {
        if (err) {
          console.log(err);
          return;
        }
        req.app.set('connection', connection);
      });
    });
};