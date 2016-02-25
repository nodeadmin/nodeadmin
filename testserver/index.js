var express = require('express');
var app = express();
var mysql = require('mysql');

var nodeadmin = require(__dirname + '/../middleware/index.js');


app.use(nodeadmin(app, process.env.PORT || 4040));
app.use('/', function(req, res, next) {

  res.send('<h1>HELLO WORLD</h1>');

});

app.listen(process.env.PORT || 4040);

module.exports = app;
