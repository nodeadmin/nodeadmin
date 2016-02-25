var Promise = require('bluebird');
var router = require('express').Router();
var HomeController = Promise.promisifyAll(require('./homecontroller'));
var tokenCheck = require('../auth/tokencheck.js');

router.use(tokenCheck);

router.route('/os')
  .get(function (req, res) {
    'use strict';
    Promise.all([
      HomeController.getHostnameAsync(),
      HomeController.getUptimeAsync(),
      HomeController.getTypeAsync(),
      HomeController.getLoadAvgAsync(),
      HomeController.getTotalMemoryAsync()
    ])
    .then(function (stats){
      var sys = {};

      sys['hostname'] = stats[0];
      sys['uptime'] = stats[1];
      sys['type'] = stats[2];
      sys['load'] = stats[3];
      sys['memory'] = stats[4];
      res.end(JSON.stringify(sys));
    })
    .catch(function (err){
      console.error('couldn\'t query system stats', err);
      res.end();
    });

  });

router.route('/connections')
  .get(function (req, res){
    'use strict';
    HomeController.getServerConnectionsAsync(req)
      .then(function (data) {
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
  });

router.route('/cpu')
  .get(function (req, res) {
    'use strict';
    HomeController.getCpusAsync()
      .then(function (cpus){
        res.status(200).json(cpus);
      })
      .catch(function (err){
        res.status(500).json(err);
      });
  });

module.exports = router;
