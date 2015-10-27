angular.module('nodeadmin.db.dbhome', [])
.controller('DBHomeController', ['$scope', 'DBInfoFactory', 
  function ($scope, DBInfoFactory) {
    var perfData;
    DBInfoFactory.getPerformanceTimers()
    .then(function (data) {
      var perfData = data;
      // console.log(perfData);
      $scope.perfHeaders = Object.keys(perfData[0]);
      $scope.perfRows = perfData;
    });
    DBInfoFactory.getInfo()
    .then(function (data) {
      var infoData = data;
      console.log(infoData);
      delete infoData[0]['INFO'];
      $scope.infoHeaders = Object.keys(infoData[0]);
      $scope.infoRows = infoData;
    });
  }
]);
