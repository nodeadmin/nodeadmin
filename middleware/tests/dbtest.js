var expect = require('chai').expect;
var request = require('supertest')('http://localhost:4000');

var client = require('../auth/clientdb.js');
// var connection = client.getClientDB();



var token;

describe('Database CRUD Opeations', function(){


  before(function (done){
    request.post('/nodeadmin/api/auth/login')
      .send({
        mysqlUser: 'taylor',
        mysqlPassword:'winget'
      })
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done('error');
        }
        if(res) {
          token = res.body.token;
          done();
          
        }    
      });
  });


  it('should successfully create a new database', function (done) {

    request.post('/nodeadmin/api/db/create')
      .set('Authorization', token)
      .send({
        name:'mochadb'
      })
      .expect(201)
      .end(function (err, res){
        if(err) {
          done(err);
        } else {
          done();          
        }
      })
    
  })


  it('should successfully create a database table', function (done) {

    var schema = [
    {
      'fieldName':'id',
      'type':'INT',
      'null': false,
      'auto': true,
      'quality': 'PRIMARY KEY'
    },
    {
      'fieldName':'name',
      'type':'VARCHAR',
      'fieldLength':200,
      'null': false,
      'auto': true,
      'quality': 'PRIMARY KEY'
    },
    ];

    request.post('/nodeadmin/api/mochadb/testtable')
      .set('Authorization', token)
      .send({
        schema:schema
      })
      .expect(200)
      .end(function (err, res){
        if(err) {
          done(err);
        } else {
          done();          
        }
    })
    
  })

  it('should successfully delete a database table', function (done) {
    
    request.delete('/nodeadmin/api/mochadb/testtable')
      .set('Authorization', token)
      .expect(200)
      .end(function (err, res){
        if(err) {
          done(err);
        } else {
          done();          
        }
    })
    
  })


  it('should successfully delete database', function (done) {

    request.post('/nodeadmin/api/db/delete')
      .set('Authorization', token)
      .send({
        name:'mochadb'
      })
      .expect(200)
      .end(function (err, res){
        if(err) {
          done(err);
        } else {
          done();          
        }
    })
    
  })


});
