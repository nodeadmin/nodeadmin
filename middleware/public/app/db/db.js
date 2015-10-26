angular.module('nodeadmin.db', [])
.controller('RecordsController', ['$scope', 'RecordsFactory', '$stateParams', function ($scope, RecordsFactory, $stateParams) {
  $scope.records = {};
  $scope.headers = []; 
  $scope.error = '';
  $scope.getRecords = function () {
    console.log($stateParams);
    RecordsFactory.getRecords($stateParams.database, $stateParams.table)
    .then(function (result) {
      for (var prop in result[0]) {
        $scope.headers.push(prop);
      } 
      $scope.records = result;
    })
    .catch(function (err) {
      $scope.error = err;
    });
  };
  $scope.getRecords();
  console.log($scope.records);
}])  
.factory('dbFactory', function ($http) {
  return {
    getDatabases:function() {
      return $http({
        method:'GET',
        url:'/nodeadmin/api/db/connect'
      });
    }
  };
})
.controller('DBController', ['$scope','dbFactory', function ($scope, dbFactory) {

  console.log(dbFactory);
  $scope.databases = [];

  $scope.menu = false;

  $scope.toggleMenu = function () {
    $scope.menu = !$scope.menu;
  };

  $scope.loadDatabases = function() {
    dbFactory.getDatabases()
      .then(function (dbs) {
        $scope.databases = dbs.data;

        // $scope.$digest();

      });

  };

  $scope.loadDatabases();

}]);
