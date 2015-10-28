/* jshint strict: false */
angular.module('nodeadmin.db', [])
.controller('RecordsController', ['$scope', 'RecordsFactory', '$stateParams', function ($scope, RecordsFactory, $stateParams) {
  $scope.records = {};
  $scope.headers = []; 
  $scope.error = '';
  $scope.isEditing = ''; 
  $scope.primaryKey = '';
  $scope.table = $stateParams.table;
  $scope.getRecords = function () {
    console.log($scope.headers);
    RecordsFactory.getRecords($stateParams.database, $stateParams.table)
    .then(function (result) {
      $scope.records = result[0];
      $scope.headers = result[1];
      $scope.getPrimaryKey($scope.headers);
    })
    .catch(function (err) {
      $scope.error = err;
    });
  };

  $scope.getPrimaryKey = function (headers) {
    for (var i = 0; i < headers.length; i++) {
      if (headers[i].Key === 'PRI') {
        $scope.primaryKey = headers[i].Field;
        return;
      }
      console.log('No Primary key');
    }
  };
  $scope.editCell = function (id) {
     $scope.isEditing = id;
  };
  $scope.saveCell = function (data, index, id) {
    var update = {
      table: $stateParams.table,
      col: $scope.headers[index].Field,
      val: data,
      pk: $scope.primaryKey
    };
    RecordsFactory.editRecord($stateParams.database, $stateParams.table, update)
    .then(function (result) {
      console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });
    $scope.isEditing = false;
  };
  $scope.getRecords();
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

  // console.log(dbFactory);
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
