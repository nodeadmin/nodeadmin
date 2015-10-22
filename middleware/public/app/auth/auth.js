angular.module('nodeadmin.auth', [])

.controller('AuthController', ['$scope', '$window', '$state', 'Auth', function($scope, $window, $state, Auth) {
  $scope.user = {};

  $scope.setup = function() {
    Auth.setup($scope.user)
      .then(function(token) {
        // Store session token
        $window.localStorage.setItem('nodeadmin', token);
        $state.transitionTo('home');
      })
      .catch(function(err) {
        console.error(err);
        // Allow for error displaying on setup page
        $scope.error = err.data;
      });
  };

  $scope.login = function() {
    Auth.login($scope.user)
      .then(function(token) {
        // Store session token
        $window.localStorage.setItem('nodeadmin', token);
        $state.transitionTo('home');
      })
      .catch(function(err) {
        console.error(err);
        // Allow for error displaying on login page
        $scope.error = err.data;
      });
  };

}]);
