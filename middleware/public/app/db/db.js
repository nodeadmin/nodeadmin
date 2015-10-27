angular.module('nodeadmin.db', [])
.controller('RecordsController', ['$scope', 'RecordsFactory', '$stateParams', function ($scope, RecordsFactory, $stateParams) {
  $scope.records = {};
  $scope.headers = []; 
  $scope.error = '';
  $scope.isEditing = ''; 
  $scope.primaryKey = '';


  $scope.getRecords = function () {
    console.log($stateParams);
    RecordsFactory.getRecords($stateParams.database, $stateParams.table)
    .then(function (result) {
      $scope.records = result[0];
      $scope.headers = result[1];
      for (var i = 0; i < result[1].length; i++) {
        if ($scope.headers[i].Key === 'PRI') {
          $scope.primaryKey = $scope.headers[i].Field;
          return;
        }
        console.log('No Primary key');
      }
    })
    .catch(function (err) {
      $scope.error = err;
    });
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
    console.log(id);
    console.log($scope.headers[index].Field);
    console.log(data);
    console.log($stateParams.table);
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
