angular.module('nodeadmin.auth', [])

.controller('AuthController', ['$scope', '$window', '$state', 'Auth', function($scope, $window, $state, Auth) {
  $scope.user = {};

  $scope.setup = function() {
    Auth.setup($scope.user)
      .then(function(token) {
        // Store session token
        $window.localStorage.setItem('nodeadmin', token);
        if (token) {
          $state.transitionTo('home');
        } 
      })
      .catch(function(err) {
        console.error(err.data.error);
        // Allow for error displaying on setup page
        $scope.error = err.data.error;
      });
  };

  $scope.login = function() {
    Auth.login($scope.user)
      .then(function(token) {
        // Store session token
        $window.localStorage.setItem('nodeadmin', token);
        if (token) {
          $state.transitionTo('home');
        } 
      })
      .catch(function(err) {
        console.error(err.data.error);
        // Allow for error displaying on login page
        $scope.error = err.data.error;
      });
  };

  $scope.logout = function() {
    $window.localStorage.removeItem('nodeadmin');
    $state.transitionTo('login');
  };

}]);
