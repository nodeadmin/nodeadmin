var express = require('express');
var router = express.Router();
var tokenCheck = require('../auth/tokenCheck.js');

router.use(tokenCheck);

var exec = require('child_process').exec;

router.route('/modules')
  .get(function (req, res){
    exec('npm list --long', function(err, stdout, stderr) {
      if (err) {
        console.log('Error executing npm list --long: ', err);
      }
      res.send(stdout);
    });
  });

module.exports = router;
