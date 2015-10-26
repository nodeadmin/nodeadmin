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
connection.query('show databases', function (err, rows, fields) {
  console.log('showing databases... err: ', err, 'rows: ', rows, 'fields: ', fields);
});

connection.query('create database testserverdb', function (err, rows) {
  console.log('creating testserverdb... err: ', err, 'rows: ', rows);
});

connection.query('use testserverdb', function (err, rows) {
  console.log('connecting to testserverdb... err: ', err, 'rows: ', rows);
});

connection.query(
  'CREATE TABLE pet (name VARCHAR(20), owner VARCHAR(20), species VARCHAR(20), sex CHAR(1));',
  function (err, rows) {
    console.log('creating pet table... err: ', err, 'rows: ', rows);
  }
);

connection.query(
  'insert into pet (name, owner, species, sex) values ("Spot", "Alex", "Dog", 1)',
  function (err, rows) {
    console.log('inserting spot into pets... err: ', err, 'rows: ', rows);
  }
);


app.use(nodeadmin(app, 4040));
app.use('/', function(req, res, next) {

  res.send('<h1>HELLO WORLD</h1>');

});

//app.listen(4040);
