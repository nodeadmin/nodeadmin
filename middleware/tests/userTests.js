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

}); // Closes 'describe Auth API Route'


describe('Users API Route', function() {

  it('should accept submissions of new users with password and host', function(done) {

    request
      .post('/nodeadmin/api/settings/users')
      .set('Authorization', token)
      .send({
        user: 'RickandMorty',
        password: 'wubbalubbadubdub',
        host: 'host'
      })
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  }); // Closes 'it should accept submissions of new users with host and password'

  it('should accept submissions of new users with password and no host', function(done) {

    request
      .post('/nodeadmin/api/settings/users')
      .set('Authorization', token)
      .send({
        user: 'RickandMorty2',
        password: 'wubbalubbadubdub',
        host: ''
      })
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  }); // Closes 'it should accept submissions of new users with no host'

  it('should accept submissions of new users with host and no password', function(done) {

    request
      .post('/nodeadmin/api/settings/users')
      .set('Authorization', token)
      .send({
        user: 'RickandMorty3',
        password: '',
        host: 'host'
      })
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  }); // Closes 'it should accept submissions of new users with no password'

  it('should get all users', function(done) {

    request
      .get('/nodeadmin/api/settings/users')
      .set('Authorization', token)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  }); // Closes 'it should get all users'

  it('should edit users\' host and username', function(done) {

    request
      .put('/nodeadmin/api/settings/users')
      .set('Authorization', token)
      .send({
        column: 'host',
        newData: 'localhost',
        row: {
          host: 'host',
          user: 'RickandMorty'
        }
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  }); // Closes 'it should edit users'

  it('should delete users', function(done) {

    request
      .delete('/nodeadmin/api/settings/users/RickandMorty/host')
      .set('Authorization', token)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          request
            .delete('/nodeadmin/api/settings/users/RickandMorty2/localhost')
            .set('Authorization', token)
            .expect(200)
            .end(function(err, res) {
              if (err) {
                done(err);
              } else {
                request
                  .delete('/nodeadmin/api/settings/users/RickandMorty3/host')
                  .set('Authorization', token)
                  .expect(200)
                  .end(function(err, res) {
                    if (err) {
                      done(err);
                    } else {
                      done();
                    }
                  });
              }
            });

        }
      });
  }); // Closes 'it should delete users'

}); // Closes 'describe Users API Route'
