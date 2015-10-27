angular.module('nodeadmin.db.dbhome', [])
.controller('DBHomeController', ['$scope', 'PerformanceGraphFactory', 
  function ($scope, PerformanceGraphFactory) {
    var perfData;
    PerformanceGraphFactory.getPerformanceTimers()
    .then(function(data) {
      var perfData = data;
      $scope.headers = Object.keys(perfData[0])
      $scope.rows = perfData;
    });
  }
]);
