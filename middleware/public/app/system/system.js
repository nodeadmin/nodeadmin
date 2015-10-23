angular.module('nodeadmin.system', [])
.controller('SystemController', ['$scope', function ($scope) {
  $scope.system = 'system stuff';

  $scope.toggleMenu = function () {
    $scope.menu = !$scope.menu;
  }
  $scope.menu = false;
}]);
