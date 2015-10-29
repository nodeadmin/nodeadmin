var exec = require('child_process').exec;

  console.log(module.parent.parent)
module.exports = {

  getNpmModules: function(req, res) {
    exec('npm list --long', function(err, stdout, stderr) {
      if (err) {
        console.log('Error executing npm list --long: ', err);
      }
      res.send(stdout);
    });
  },

  getModuleChildren: function(req, res) {
    // user's server file: module.parent.parent;
    // user's server file name: module.parent.parent.filename;
      // children of user's server file: module.parent.parent.children (array)

    var parent = module.parent.parent;

    res.send(parent);
  }
  
};
