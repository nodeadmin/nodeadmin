angular.module('nodeadmin.main', [])
.controller('MainController', ['$scope', function ($scope) {
  $scope.logout = function () {
    console.log('you clicked logout');
  }
}]);
