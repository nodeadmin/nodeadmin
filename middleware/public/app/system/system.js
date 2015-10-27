angular.module('nodeadmin.system', [])

.controller('SystemController', ['$scope', '$state', function ($scope, $state) {
  
  $scope.subState = function (stateName) {
    $state.transitionTo(stateName);
  };

  $scope.toggleMenu = function () {
    $scope.menu = !$scope.menu;
  };
  $scope.menu = false;

}]);
