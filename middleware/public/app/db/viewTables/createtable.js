angular.module('nodeadmin.db.createtable', [])
.controller('CreateTableViewController', ['$scope', '$uibModal', '$stateParams', 'Tables', function ($scope, $uibModal, $stateParams, Tables) {

    $scope.fields = [{}];
    $scope.tablename = '';
    $scope.database = $stateParams.database;

    $scope.addField = function(num) {

      do {
        $scope.fields.push({});
        
      } while(--num);
      
    };

    $scope.processTable = function() {

      if(!$scope.tablename) {
        // todo: - throw error to notification center - must submit table name

      }

      if(!$scope.database) {
        // todo: throw error to notification center - error retrieving database name
      }

      Tables.createTable($scope.database, $scope.tablename, $scope.fields)
        .then(function (response) {

        })
        .catch(function (error){
          
        });
    };

  }
]);
