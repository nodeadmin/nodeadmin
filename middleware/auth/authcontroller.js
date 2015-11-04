
var client = require('./clientdb.js');

module.exports = {

  logout: function(req, res) {
    // close database connection
    client.getClientDB().end(function (err){
      if(!err) {
        res.status(200).end();
      } else {
        res.end(err.toString());
      }
    });

  }

}
