angular.module('nodeadmin.db.viewTables', [])
  .controller('TableViewController', ['$scope', '$uibModal', '$stateParams', 'Tables',
    function($scope, $uibModal, $stateParams, Tables) {

      $scope.tables = [];

      $scope.getTables = function() {
        var databaseName = $stateParams.database;
        $scope.databaseName = databaseName;
        Tables.getTables(databaseName)
          .then(function(result) {
            result.forEach(function(table) {
              $scope.tables.push(table['Tables_in_' + databaseName]);
            });
          })
          .catch(function(err) {
            $scope.error = err.data;
          });
      };

      // Get tables on load
      $scope.getTables();

      // `Delete table` modal
      $scope.animationsEnabled = true;

      $scope.open = function(size, tableName) {
        Tables.saveTableName(tableName);

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/db/viewTables/deleteTable.html',
          controller: 'DeleteTableController',
          size: size
        });

        modalInstance.result.then(function(result) {
          if (typeof result === 'string') {
            $scope.success = result;
          } else {
            $scope.error = result.data;
          }
        });
      };

      $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };
    }
  ]);
