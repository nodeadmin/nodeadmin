var router = require('express').Router();
var authcontroller = require('./authcontroller.js');


router.route('/login')
  .post(authcontroller.login);


router.route('/logout')
  .get(authcontroller.logout);


module.exports = router;
