angular.module('nodeadmin.db.deleteTable', [])
  .controller('DeleteTableController', function($scope, $modalInstance, $stateParams, Tables) {

  $scope.dropTable = Tables.returnDropTableName();

  $scope.ok = function() {
    // Drop table
    Tables.dropTable($stateParams.database, $scope.dropTable)
      .then(function(droppedTable) {
        // remove table from page
        Tables.updateView(droppedTable, null);
        $modalInstance.close(droppedTable);
      })
      .catch(function(err) {
        Tables.updateView(null, err.data);
        $modalInstance.close(err);
      });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
