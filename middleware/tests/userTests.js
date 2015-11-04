var expect = require('chai').expect;
var request = require('supertest')('http://192.168.99.101:4040');

var client = require('../auth/clientdb.js');
var connection = client.getClientDB();

// Need to pass in your server file
// var app = require('./../../testserver/index.js');

describe('Auth', function() {

  it('should sign in an existing user with valid password', function(done) {

    request.post('/nodeadmin/api/auth/login')
      .send({
        user: 'root',
        password: 'babka'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          console.log('\n\n\n\n\nwhat is this', res)
          done();
        }
      });

  }); // Closes 'it should sign in an existing user with valid password'

  it('should return a token on login', function(done) {

    request()
      .post('/nodeadmin/api/auth/login')
      .send({
        user: 'root',
        password: 'babka'
      })
      .expect(200)
      .end(function(err, res) {
        console.log('\n\n\n\n\n\nresult?', res.token)
      })
  }); // Closes 'it should return a token on login'
}); // Closes 'describe Auth'


describe('Users', function() {
  
  it('should accept submissions of new users with password and host as a POST request on /api/users', function(done) {

    request(app)
      .post('/nodeadmin/api/settings/users')
      .send({
        user: 'Rick',
        password: 'wubbalubbadubdub',
        host: ''
      })
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          console.log('res', res)
            done();
          }
        }
      );

  }); // Closes 'it should accept submissions of new users'

  // TODO: delete all users that were created

}); // Closes 'describe Users'
