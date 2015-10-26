angular.module('nodeadmin.db', [])
.controller('DBController', ['$scope', function ($scope) {
  $scope.awesomeTable = 'I am an Awesome Table';
  $scope.toggleMenu = function () {
    $scope.menu = !$scope.menu;
  };
  $scope.menu = false;
}])
.controller('RecordsController', ['$scope', '$RecordsFactory', '$location', function ($scope, $RecordsFactory, $location) {
  $scope.records = {};
  
  $scope.getRecords = function () {
    console.log($location.path);
  };
  
}]);
