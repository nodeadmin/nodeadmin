var expect = require('chai').expect;
var request = require('supertest')('http://localhost:4040');
var connection = require('../test.js');

var token;

describe('USER CRUD', function() {

  // Pass in your login information
  before(function(done) {
    request.post('/nodeadmin/api/auth/login')
      .send({
        mysqlUser: connection.user,
        mysqlPassword: connection.password,
        mysqlHost: connection.host
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done('error');
        } else {
          token = res.body.token;
          done();
        }
      });
  });


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
      .put('/nodeadmin/api/settings/users/RickandMorty/host')
      .set('Authorization', token)
      .send({
        newData: 'localhost',
        oldData: 'host'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  }); // Closes 'it should edit users\' host and username'

  it('should get all grants per user', function(done) {

    request
      .get('/nodeadmin/api/settings/users/RickandMorty3/host/grants')
      .set('Authorization', token)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  }); // Closes 'it should get all grants per user'


  it('should get grants record per user', function(done) {

    request
      .get('/nodeadmin/api/settings/users/RickandMorty3/host/grantsrecord')
      .set('Authorization', token)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  }); // Closes 'it should get grants record per user'

  it('should edit users\' grants record', function(done) {

    request
      .put('/nodeadmin/api/settings/users/RickandMorty3/host/grantsrecord')
      .set('Authorization', token)
      .send({
        column: 'UPDATE',
        val: 'N'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  }); // Closes 'it should edit users\' host and username'

  it('should delete users', function(done) {
    after(function (){
      console.log('done');
    })

    request
      .delete('/nodeadmin/api/settings/users/RickandMorty/localhost')
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

}); // Closes 'describe CRUD'
