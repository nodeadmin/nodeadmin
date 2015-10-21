var Promise = require('bluebird');
var HomeController = Promise.promisifyAll(require('./HomeController'));

console.log(HomeController);

module.exports = function(router) {

  router.route('/os')
    .get(function (req, res) {
      Promise.all([HomeController.getHostnameAsync(),HomeController.getTypeAsync(), HomeController.getUptimeAsync()])
        .then(function (res){
          console.log('got stats', res);
          res.end(res);
        })
        .catch(function (err) {
          console.log('error promisifying');
          res.end(err);
        })
    });

};
