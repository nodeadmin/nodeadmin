angular.module('nodeadmin.main', [])
.controller('MainController', ['$scope', '$state', function ($scope, $state) {

$scope.logout = function() {
  $window.localStorage.removeItem('nodeadmin');
  $state.transitionTo('login');
};

}]);
