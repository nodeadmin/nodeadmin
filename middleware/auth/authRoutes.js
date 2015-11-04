var express = require('express');
var router = express.Router();
var mysql = require('promise-mysql');
var jwt = require('jsonwebtoken');
var connectionWrapper = require('./clientdb.js');
var authcontroller = require('./authcontroller.js');


router.route('/login')
  .post(function (req, res) {
    mysql.createConnection({
      user: req.body.mysqlUser,
      password: req.body.mysqlPassword,
      multipleStatements: true
    }).then(function(conn) {
        var token = jwt.sign({msg: 'welcome!'}, req.app.locals.secret);
        //Enables performance_schema if it was disabled\\
        conn.query(
          "update performance_schema.setup_consumers set enabled='YES' where name='events_waits_current';", 
          function (err, rows, fields) {
          }
        );
        connectionWrapper.bindClientDB(conn);
				res.status(200).json({token: token});
    }).catch(function (e) {
      console.log(e);
      if(e.errno === 1045) {
        res.status(500).json({error: 'We couldn\'t connect to the host with the credentials you provided. Please try again.'});
      } else if (e.errno === 'ENOTFOUND') {
        res.status(500).json({error: 'We couldn\'t find the host that you provided. Double check to make sure you typed it in correctly and try again.'});
      } else {
        res.status(500).json({error: 'something broke.'});
      }
    });
  });

router.route('/logout')
  .get(authcontroller.logout);


module.exports = router;
