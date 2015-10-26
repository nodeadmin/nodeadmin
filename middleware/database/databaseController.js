var  mysql = require('mysql');
var client = require('../auth/clientdb.js');

db.query(
  "update performance_schema.setup_consumers set enabled='YES' where name='events_waits_current';", 
  function (err, rows, fields) {
    console.log('enabling performance_schema... err: ', err, 'rows: ', rows);
  }
);

module.exports = {

  getDatabases: function (req, res) {
    console.log('database is stored', req.app.locals);
  },

  connect: function (req, res) {
    client = client.getClientDB();
    client.query('SHOW DATABASES', function(err, row) {
      row && res.end(JSON.stringify(row));
    });
  },



};

