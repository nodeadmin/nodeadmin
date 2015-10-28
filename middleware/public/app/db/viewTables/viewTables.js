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
          size: size,
          resolve: {
            table: function() {
              console.log('whtat is this', $scope.$parent);
            }
          }
        });

        modalInstance.result.then(function(result) {
            console.log('modal results:',result);
            $scope.success = result;
          }, function() {
            // cancel
          });
      };

      $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };
    }
  ]);
