var OS = require('os');

module.exports = {

  getHostname:function(req, res) {
    OS.hostname(function (err, data) {
      console.log('GOT HOST NAME ----->', data);
    });

  }

}




