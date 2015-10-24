var express = require('express');
var app = express();
var mysql = require('mysql');

var nodeadmin = require('../middleware/index.js');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'babka'
});

connection.connect();
connection.query('show databases', function (err, rows, fields){
    console.log(err, rows, fields);
});



app.use(nodeadmin(app, 4040));
app.use('/', function(req, res, next) {

  res.send('<h1>HELLO WORLD</h1>');

});

//app.listen(4040);
