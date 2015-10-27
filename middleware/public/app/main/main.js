angular.module('nodeadmin.main', [])
.controller('MainController', ['$scope', '$state', '$window',  function ($scope, $window, $state) {

  $scope.logout = function() {
    $window.localStorage.removeItem('nodeadmin');
    $state.transitionTo('login');
  };

}]);
