angular.module('nodeadmin.services', [])

.factory('Auth', function($http, $window) {
  var setup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/auth/setup',
      data: user
    })
    .then(function(resp) {
      return resp.data.token;
    });
  };

  var login = function(user) {
    return $http({
      method: 'POST',
      url: 'api/auth/login',
      data: user
    }).then(function(resp) {
      return resp.data.token;
    });
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem('nodeadmin');
  };

  return {
    setup: setup,
    login: login,
    isAuth: isAuth
  };

});

  
  
