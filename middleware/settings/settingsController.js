var mysql = require('mysql');
var client = require('../auth/clientdb.js');

module.exports = {
  getUsers: function(req, res) {
    var connection = client.getClientDB();

    connection.query('USE mysql', function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      }
      connection.query('SELECT * FROM user', function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err.toString());
        } else {
          res.status(200).json(result);
        }
      });
    });
  }
};
