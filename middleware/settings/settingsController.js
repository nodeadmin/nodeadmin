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
          // Default grant all to new users
          connection.query("GRANT ALL ON *.* TO " + "'" + user + "'" + "@" + "'" + host + "'" + "", function(err, result) {
            if (err) {
              console.log(err);
              res.status(500).send(err.toString());
            } else {
              connection.query('FLUSH PRIVILEGES', function(err, result) {
                if (err) {
                  console.log(err);
                  res.status(500).send(err.toString());
                } else {
                  res.status(201).send(result);
                }
              });
            }
          });
        }
      });
    } else {
      connection.query("CREATE USER " + "'" + user + "'" + "@" + "'" + host + "'" + "IDENTIFIED BY " + "'" + password + "'" + "", function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err.toString());
        } else {
          // Default grant all to new users
          connection.query("GRANT ALL ON *.* TO " + "'" + user + "'" + "@" + "'" + host + "'" + "", function(err, result) {
            if (err) {
              console.log(err);
              res.status(500).send(err.toString());
            } else {
              connection.query('FLUSH PRIVILEGES', function(err, result) {
                if (err) {
                  console.log(err);
                  res.status(500).send(err.toString());
                } else {
                  res.status(201).send(result);
                }
              })
            }
          })
        }
      });
    }
  },

  editUser: function(req, res) {
    var connection = client.getClientDB();
    var column = req.body.column;
    var newData = req.body.newData;
    var row = req.body.row;

    // Copy old information
    var newRow = {};
    newRow.host = row.host;
    newRow.user = row.user;

    // Add new user information
    newRow[column] = newData;

    connection.query('RENAME USER ?@? TO ?@?', [row.user, row.host, newRow.user, newRow.host], function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      } else {
        connection.query('FLUSH PRIVILEGES', function(err, result) {
          if (err) {
            console.log(err);
            res.status(500).send(err.toString());
          } else {
            res.status(200).send(true);
          }
        });
      }
    });

  },

  deleteUser: function(req, res) {
    var connection = client.getClientDB();
    var host = req.params.host;
    var user = req.params.user;

    connection.query("DROP USER " + "'" + user + "'" + "@" + "'" + host + "'" + "", function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      } else {
        res.status(200).send(result);
      }
    });
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
  },

  getGrantsRecord: function(req, res) {
    var user = req.params.user;
    var host = req.params.host;
    var connection = client.getClientDB();

    connection.query("SELECT * FROM mysql.user WHERE user = " + "'" + user + "'" + " AND host =  " + "'" + host + "'" + "; DESCRIBE mysql.user", function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      } else {
        res.status(200).send(result);
      }
    })
  },

  editGrantsRecord: function(req, res) {
    var connection = client.getClientDB();
    var user = req.params.user;
    var host = req.params.host;
    var column = req.body.column;
    var val = req.body.val;

    if (val === 'grant') {
      connection.query("GRANT ALL ON *.* TO " + "'" + user + "'" + "@" + "'" + host + "'" + "", function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err.toString());
        } else {
          connection.query('FLUSH PRIVILEGES', function(err, result) {
            if (err) {
              console.log(err);
              res.status(500).send(err.toString());
            } else {
              res.status(200).send(result);
            }
          })
        }
      })
    } else if (val === 'revoke') {
      connection.query("REVOKE ALL PRIVILEGES, GRANT OPTION FROM " + "'" + user + "'" + "@" + "'" + host + "'" + "", function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err.toString());
        } else {
          connection.query('FLUSH PRIVILEGES', function(err, result) {
            if (err) {
              console.log(err);
              res.status(500).send(err.toString());
            } else {
              res.status(200).send(result);
            }
          })
        }
      });
    } else {
      if (val === 'Y') {
        connection.query("GRANT " + column + " ON *.* TO " + "'" + user + "'" + "@" + "'" + host + "'" + "", function(err, result) {
          if (err) {
            console.log(err);
            res.status(500).send(err.toString());
          } else {
            connection.query('FLUSH PRIVILEGES', function(err, result) {
              if (err) {
                console.log(err);
                res.status(500).send(err.toString());
              } else {
                res.status(200).send(result);
              }
            })
          }
        })
        // REVOKE INSERT ON *.* FROM 'jeffrey'@'localhost';
      } else if (val === 'N') {
        connection.query("REVOKE " + column + " ON *.* FROM " + "'" + user + "'" + "@" + "'" + host + "'" + "", function(err, result) {
          if (err) {
            console.log(err);
            res.status(500).send(err.toString());
          } else {
            connection.query('FLUSH PRIVILEGES', function(err, result) {
              if (err) {
                console.log(err);
                res.status(500).send(err.toString());
              } else {
                res.status(200).send(result);
              }
            })
          }
        })
      }
    }
  },

  getGrantsDescription: function(req, res) {
    var connection = client.getClientDB();

    connection.query('SHOW PRIVILEGES', function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      } else {
        res.status(200).send(result);
      }
    })
  }
};
