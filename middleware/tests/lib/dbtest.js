var connection = require('../test.js');
var expect = require('chai').expect;
var request = require('supertest')('http://localhost:4040');

var token;

describe('CRUD', function(){

  before(function (done){
    request.post('/nodeadmin/api/auth/login')
      .send({
        mysqlUser: connection.user,
        mysqlPassword:connection.password,
        mysqlHost: connection.host
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

  describe('CREATE Datatbase', function(){
    var database_before;


    it('should successfully create a new database', function (done) {

      request.post('/nodeadmin/api/db/create')
        .set('Authorization', token)
        .send({ name:'mochadb' })
        .expect(201)
        .end(function (err, res){
          if(err) {

            done(err);
          } else {
            done();
          }
        });
    })



  });

  describe('DELETE Database', function() {

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

  })




  

  describe('CREATE Table', function() {


    before(function (done){
      request.post('/nodeadmin/api/db/create')
        .set('Authorization', token)
        .send({name :'mochadb'})
        .expect(201)
        .end(done)
    });



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
        'auto': false
      },
      ];

      request.post('/nodeadmin/api/db/mochadb/testtable')
        .set('Authorization', token)
        .send(schema)
        .expect(201)
        .end(function (err, res){
          if(err) {
            done(err);
          } else {
            done();
          }
      })
    })
  });


  describe('DROP TABLE', function () {

    after(function (done){
      request.post('/nodeadmin/api/db/delete')
        .set('Authorization', token)
        .send({
          name:'mochadb'
        })
        .expect(200)
        .end(done)
    })
    
    it('should successfully delete a database table', function (done) {
      
      request.delete('/nodeadmin/api/db/mochadb/testtable')
        .set('Authorization', token)
        .expect(200)
        .end(function (err, res){
          if(err) {
            done(err);
          } else {
            done();
          }
      })
      
    });

  })

  describe('QUERY DB', function () {

    it('should be able to accept direct database queries', function (done) {

      request.post('/nodeadmin/api/query')
        .set('Authorization', token)
        .expect(200)
        .end(function (err, res){
          if(err) {
            done(err);
          } else {
            done();
          }
        });

    });

  });

});
