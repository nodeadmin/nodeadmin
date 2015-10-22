angular.module('nodeadmin.navbar', [])
.controller('NavController', ['$scope', '$window', '$state', function ($scope, $window, $state) {
  $scope.logout = function() {
    $window.localStorage.removeItem('nodeadmin');
    $state.transitionTo('login');
  };

  var state = $state.current.name;
  $scope._state = state;
  
}]);
