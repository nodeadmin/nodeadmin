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
      connection.query('SELECT host, user FROM user', function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err.toString());
        } else {
          res.status(200).json(result);
        }
      });
    });
  },

  addUser: function(req, res) {
    var connection = client.getClientDB();
    var user = req.body.user;
    var password = req.body.password;
    var host = req.body.host || 'localhost';

    if (!password) {
      connection.query("CREATE USER " + "'" + user + "'" + "@" + "'" + host + "'" + "", function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err.toString());
        } else {
          res.status(200).send(true);
        }
      });
    } else {
      connection.query("CREATE USER " + "'" + user + "'" + "@" + "'" + host + "'" + "IDENTIFIED BY " + "'" + password + "'" + "", function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err.toString());
        } else {
          res.status(200).send(true);
        }
      });
    }
  },

  getGrants: function(req, res) {
    var user = req.params.user;
    var host = req.params.host;
    var connection = client.getClientDB();

    connection.query("SHOW GRANTS FOR " + "'" + user + "'" + "@" + "'" + host + "'" + "", function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      } else {
        res.status(200).send(result);
      }
    });
  }
};
