angular.module('nodeadmin.db.deleteTable', [])
  .controller('DeleteTableController', function($scope, $modalInstance, $stateParams, Tables) {

  $scope.dropTable = Tables.returnDropTableName();

  $scope.ok = function() {
    // Drop table
    Tables.dropTable($stateParams.database, $scope.dropTable);
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
