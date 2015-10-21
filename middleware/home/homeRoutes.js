var HomeController = require('./HomeController');

module.exports = function(router) {

  router.route('/os')
    .get(HomeController.getHostname);

};
