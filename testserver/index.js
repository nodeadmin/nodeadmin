var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'babka'
});

connection.connect();
connection.query('show databases', function (err, rows, fields){
    console.log(err, rows, fields);
})
app.get('/', function(req, res) {
	res.status(200).send('hello, world');
});

app.listen(4040, function () {
    console.log('now listening on port 4040');
});
