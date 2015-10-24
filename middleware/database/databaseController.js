var  mysql = require('mysql');
var db = mysql.createConnection({
  user:'taylor',
  password:'winget'
});

module.exports = {

  getDatabases: function (req, res) {
    console.log('database is stored', req.app.locals);
  },

  connect: function (req, res) {
    db.query('SHOW DATABASES', function(err, row) {
      row && res.end(JSON.stringify(row));
    });
  },



};

