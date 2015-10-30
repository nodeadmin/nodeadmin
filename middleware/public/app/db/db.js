/* jshint strict: false */
angular.module('nodeadmin.db', [])
.controller('RecordsController', ['$scope', 'RecordsFactory', 'PaganacionFactory', '$state', '$stateParams', function ($scope, RecordsFactory, PaganacionFactory, $state, $stateParams) {
  $scope.records = {};
  $scope.headers = []; 
  $scope.error = '';
  $scope.isEditing = ''; 
  $scope.primaryKey = '';
  $scope.maxSize = PaganacionFactory.maxSize;
  $scope.table = $stateParams.table;
  $scope.loading = true;
  $scope.currentPage = PaganacionFactory.currentPage;
  $scope.recordsCount = PaganacionFactory.records;
  $scope.getRecords = function () {
    RecordsFactory.getRecords($stateParams.database, $stateParams.table, $stateParams.page)
    .then(function (result) {
      $scope.records = result[0];
      $scope.headers = result[1];
      PaganacionFactory.records = result[2][0]['count(*)'] - 1;
      $scope.recordsCount = PaganacionFactory.records;
      $scope.getPrimaryKey($scope.headers);
    })
    .catch(function (err) {
      $scope.error = err;
    })
    .finally(function () {
      $scope.loading = false;
    });
  };
  
  $scope.paganacion = function () {
    PaganacionFactory.currentPage = $scope.currentPage;
    $state.go('records', {
      database:$stateParams.database,
      table: $scope.table,
      page: $scope.currentPage 
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
    console.log('hello');
    var update = {
      table: $stateParams.table,
      col: $scope.headers[index].Field,
      val: data,
      pk: $scope.primaryKey
    };
    console.log(update);
    RecordsFactory.editRecord($stateParams.database, $stateParams.table, $stateParams.page, update)
    .then(function (result) {
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
.factory('PaganacionFactory', [function () {
  return {
    currentPage: 1,
    records: 0,
    maxSize: 10
  };
}])
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
