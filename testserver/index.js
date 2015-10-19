var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'T0r0nt05t4r!'
});

connection.connect();
connection.query('show databases', function (err, rows, fields){
    console.log(err, rows, fields);
})
app.listen(3030);
