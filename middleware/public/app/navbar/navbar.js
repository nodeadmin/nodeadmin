angular.module('nodeadmin.navbar', [])
.controller('NavController', ['$scope', function ($scope) {
  $scope.logout = function () {
    console.log('you clicked logout');
  }
}]);
