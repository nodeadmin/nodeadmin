angular.module('nodeadmin.db', [])
.factory('dbFactory', function ($http) {
  return {
    getDatabases:function() {
      return $http({
        method:'GET',
        url:'/nodeadmin/api/db/connect'
      });
    }
  }
})
.controller('DBController', ['$scope','dbFactory', function ($scope, dbFactory) {

  console.log(dbFactory);
  $scope.databases = [];

  $scope.loadDatabases = function() {
    dbFactory.getDatabases()
      .then(function (dbs) {
        $scope.databases = dbs.data;

        // $scope.$digest();

      })

  };

  $scope.loadDatabases();

}]);
