var Promise = require('bluebird');
var HomeController = Promise.promisifyAll(require('./HomeController'));

module.exports = function(router) {

  router.route('/os')
    .get(function (req, res) {
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
        console.error('couldn\'t query system stats');
        res.end();
      });

    });

  router.route('/connections')
    .get(function(req, res){
      HomeController.getServerConnectionsAsync(req)
        .then(function (data) {
          console.log('connections areeee here ', data);
        })
        .catch(function (err) {
          console.log(err);
        });
    });

  router.route('/cpu')
    .get(function (req, res) {
      HomeController.getCpusAsync()
        .then(function (cpus){
          res.end(JSON.stringify(cpus));

        })
        .catch(function (err){
          res.end(JSON.stringify(err));
        });
    })

};
