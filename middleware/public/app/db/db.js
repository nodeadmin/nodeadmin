angular.module('nodeadmin.db', [])
.controller('DBController', ['$scope', function ($scope) {
  $scope.awesomeTable = 'I am an Awesome Table';
  $scope.toggleMenu = function () {
    $scope.menu = !$scope.menu;
  }
  $scope.menu = false;
}]);
