


var mysql = require('mysql');
var exec = require('child_process').exec;
var fakeserver = exec('node ', __dirname + '/../../testserver/index.js');

var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  port     : process.env.MYSQL_PORT,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD
});


connection.connect(function (err) {
  if(err) {
    throw Error('Please rerun npm test in this format: process.env.MYSQL_HOST process.env.MYSQL_PORT process.env.MYSQL_USER process.env.MYSQL_PASSWORD npm test');
  }
})

console.log(connection);



