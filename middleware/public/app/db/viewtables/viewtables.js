angular.module('nodeadmin.db.viewTables', [])
  .controller('TableViewController', ['$scope', '$uibModal', '$stateParams', 'Tables', 'AlertCenter',
    function($scope, $uibModal, $stateParams, Tables, AlertCenter) {

      $scope.tables = [];

      AlertCenter.addAll($scope);

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
            $scope.alerts.error.push({
              status: 'Error',
              msg: err.data
            });
          });
      };

      // Get tables on load
      $scope.getTables();

      // `Delete table` modal
      $scope.animationsEnabled = true;

      $scope.open = function(size, tableName) {
        $scope.tableName = tableName;
        Tables.saveTableName(tableName);

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/db/viewtables/deletetable.html',
          controller: 'DeleteTableController',
          size: size
        });

        modalInstance.result.then(function(result) {
          if (result === $scope.tableName) {
            // Reload current tables in view
            $scope.tables = [];
            $scope.getTables();
            $scope.success = 'Successfully deleted ' + result;
            $scope.alerts.success.push({
              msg: 'Successfully deleted ' + result,
              status: '200'
            });
          } else {
            $scope.error = result.data;
            $scope.alerts.error.push({
              msg: result.data,
              status: '400'
            });
          }
        });
      };

      $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };
    }
  ]);
