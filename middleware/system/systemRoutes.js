var exec = require('child_process').exec;

module.exports = function(router) {
  router.route('/modules')
    .get(function (req, res){
      exec('npm list --long', function(err, stdout, stderr) {
        if (err) {
          console.log('Error executing npm list --long: ', err);
        }
        res.send(stdout);
      });
    });
};
