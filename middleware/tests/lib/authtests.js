var expect = require('chai').expect;

var request = require('supertest')('http://localhost:4040');
var connection = require('../test.js');

var token;

describe('Auth API Route', function() {
  // it('should connect to homepage', function(done){
  //   request.get('/')
  //     .status(200)
  //     .end(function(err, res){
  //       console.log('tried to get homepage and here it is', err);
  //       done()
  //     })
  // })


  it('should sign in an existing user with valid password', function(done) {

    request.post('/nodeadmin/api/auth/login')
      .send({
        mysqlUser: connection.user,
        mysqlPassword: connection.password,
        mysqlHost: connection.host
      })
      .expect(200)
      .end(function(err, res) {
        if(err){
          done(err);
        } 
        token = res.body.token;
        done();
      });

  }); // Closes 'it should sign in an existing user with valid password'

  it('should return a token on login', function(done) {

    expect(token).to.be.ok;
    done();

  }); // Closes 'it should return a token on login'

  it('should not sign in a user that doesn\'t exist', function(done) {

    request.post('/nodeadmin/api/auth/login')
      .send({
        mysqlUser: 'fakeuser',
        mysqlPassword: '123'
      })
      .expect(500)
      .end(function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  }); // Closes 'it should not sign in a user that doesn\'t exist'

  it('should not sign in a user with an invalid password', function(done) {

    request.post('/nodeadmin/api/auth/login')
      .send({
        mysqlUser: 'root',
        mysqlPassword: 'beer'
      })
      .expect(500)
      .end(function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  }); // Closes 'it should not sign in a user with an invalid password'


}); // Closes 'describe Auth API Route'
