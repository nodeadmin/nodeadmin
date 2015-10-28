angular.module('nodeadmin.db.deleteTable', [])
  .controller('DeleteTableController', function($scope, $modalInstance, $stateParams, Tables) {

  $scope.dropTable = Tables.returnDropTableName();

  $scope.ok = function() {
    // Drop table
    Tables.dropTable($stateParams.database, $scope.dropTable)
      .then(function(droppedTable) {
        // remove table from page
        $modalInstance.close(droppedTable);
      })
      .catch(function(err) {
        $modalInstance.close(err);
      });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
