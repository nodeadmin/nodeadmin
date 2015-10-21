angular.module('nodeadmin.services', [])

.factory('Auth', ['$http', function($http) {
  var setup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/auth/setup',
      data: user
    })
    .then(function(resp) {
      // TODO: handle response
    });
  };

  var login = function(user) {
    return $http({
      method: 'POST',
      url: 'api/auth/login',
      data: user
    }).then(function(resp) {
      // TODO: handle response
    });
  };

  return {
    setup: setup,
    login: login
  };

}]);

  
  
