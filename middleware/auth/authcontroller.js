var client = require('./clientdb.js');
var mysql = require('promise-mysql');
var jwt = require('jsonwebtoken');

module.exports = {

  login: function (req, res) {
    mysql.createConnection({
      user: req.body.mysqlUser,
      password: req.body.mysqlPassword,
      host: req.body.mysqlHost,
      multipleStatements: true
    }).then(function(conn) {
        var token = jwt.sign({msg: 'welcome!'}, req.app.locals.secret);
        //Enables performance_schema if it was disabled\\
        conn.query(
          "update performance_schema.setup_consumers set enabled='YES' where name='events_waits_current';", 
          function (err, rows, fields) {
          }
        );
        client.bindClientDB(conn);
        res.status(200).json({token: token});
    }).catch(function (e) {
      if(e.errno === 1045) {
        res.status(500).json({error: 'We couldn\'t connect to the host with the credentials you provided. Please try again.'});
      } else if (e.errno === 'ENOTFOUND') {
        res.status(500).json({error: 'We couldn\'t find the host that you provided. Double check to make sure you typed it in correctly and try again.'});
      } else {
        res.status(500).json({error: 'something broke.'});
      }
    });
      
  },

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
