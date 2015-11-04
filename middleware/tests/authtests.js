var expect = require('chai').expect;
// Pass in your URL & run server
var request = require('supertest')('http://192.168.99.101:4040');

var client = require('../auth/clientdb.js');
var connection = client.getClientDB();

var token;

describe('Auth API Route', function() {

  it('should sign in an existing user with valid password', function(done) {

    request.post('/nodeadmin/api/auth/login')
      .send({
        mysqlUser: 'root',
        mysqlPassword: 'babka'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          token = res.body.token;
          done();
        }
      });

  }); // Closes 'it should sign in an existing user with valid password'

  it('should return a token on login', function(done) {

    expect(token).to.be.ok;
    done();

  }); // Closes 'it should return a token on login'

  it('should not sign in a user that doesn\'t exist', function(done) {

    request.post('/nodeadmin/api/auth/login')
      .send({
        username: 'Laura',
        password: '123'
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
        username: 'root',
        password: 'beer'
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
