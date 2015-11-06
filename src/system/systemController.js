var exec = require('child_process').exec;

module.exports = {

  getNpmModules: function(req, res) {
    exec('npm list --long', function(err, stdout, stderr) {
      if (err) {
        //console.log('Error executing npm list --long: ', err);
      }
      res.send({"stdout": stdout, "stderr": stderr });
    });
  },
  
};
