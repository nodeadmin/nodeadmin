angular.module('nodeadmin.services', [])

.factory('Auth', ['$http', '$window', function($http, $window) {
  var setup = function(user) {
    return $http({
      method: 'POST',
      url: '/nodeadmin/api/auth/setup',
      data: user
    })
    .then(function(resp) {
      console.log('resp', resp)
      return resp.data.token;
    }, function(err) {
      console.log(err);
    });
  };

  var login = function(user) {
    return $http({
      method: 'POST',
      url: '/nodeadmin/api/auth/login',
      data: user
    }).then(function(resp) {
      return resp.data.token;
    }, function(err) {
      console.log(err);
    });
  };

  var doesDBExist = function() {
    return $http({
      method: 'GET',
      url: '/nodeadmin/api/auth/dbcheck',
    }).then(function(resp) {
      // return boolean
      console.log('doesDBExist resp: ', resp);
      return resp;
    }, function(err) {
      console.log(err);
    })
  }

  var isAuth = function() {
    return !!$window.localStorage.getItem('nodeadmin');
  };

  return {
    setup: setup,
    login: login,
    isAuth: isAuth,
    doesDBExist: doesDBExist
  };

}])

.factory('Stats', function ($http) {
  return {
    serverStats:function() {
      return $http({
        method:'GET',
        url:'/nodeadmin/api/home/os'
      })
      .then(function (data) {
        return data;
      })
      .catch(function (err) {
        return err
      });
    }
  };

});
  



