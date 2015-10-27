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

      $scope.open = function(size, tableName) {
        Tables.saveTableName(tableName);

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          template: 
          '<div id="delete-table"> \
            <div class="modal-header"> \
              <h3 class="modal-title">Delete table</h3> \
            </div> \
            <div class="modal-body"> \
              <h5>Are you sure you want to delete '+ tableName +'?</h5> \
            </div> \
            <div class="modal-footer"> \
              <button class="btn btn-primary" type="button" ng-click="ok()">Delete</button> \
              <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button> \
            </div> \
          </div>',
          controller: 'DeleteTableController',
          size: size
        });
      };

      $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };
    }
  ])
