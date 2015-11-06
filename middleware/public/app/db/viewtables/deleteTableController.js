angular.module('nodeadmin.db.deleteTable', [])
  .controller('DeleteTableController', function($scope, $uibModalInstance, $stateParams, Tables) {

  $scope.dropTable = Tables.returnDropTableName();

  $scope.ok = function() {
    // Drop table
    Tables.dropTable($stateParams.database, $scope.dropTable)
      .then(function(droppedTable) {
        $uibModalInstance.close(droppedTable);
      })
      .catch(function(err) {
        $uibModalInstance.close(err);
      });
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});
