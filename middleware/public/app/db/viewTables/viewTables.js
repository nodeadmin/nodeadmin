angular.module('nodeadmin.db.viewTables', [])
  .controller('TableViewController', ['$scope', '$uibModal', '$stateParams', 'Tables',
    function($scope, $uibModal, $stateParams, Tables) {

      $scope.tables = [];

      $scope.getTables = function() {
        var databaseName = $stateParams.database;
        Tables.getTables(databaseName)
          .then(function(result) {
            result.forEach(function(table) {
              $scope.tables.push(table['Tables_in_' + databaseName]);
            })
          })
          .catch(function(err) {
            $scope.error = err;
          });
      };

      // Get tables on load
      $scope.getTables();


      // `Delete table` modal
      $scope.animationsEnabled = true;

      $scope.open = function(size) {

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/db/viewTables/deleteTable.html',
          controller: 'DeleteTableController',
          size: size,
          // resolve: {
          //   resolved: function() {
          //     console.log('resolved')
          //   }
          // }
        });
      };

      $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };
    }
  ])
