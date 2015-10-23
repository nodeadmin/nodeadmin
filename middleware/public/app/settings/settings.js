angular.module('nodeadmin.settings', [])
.controller('SettingsController', ['$scope', function ($scope) {
  $scope.somesettings = 'I am some settings and stuff';

  $scope.toggleMenu = function () {
    $scope.menu = !$scope.menu;
  }
  $scope.menu = false;
}]);
