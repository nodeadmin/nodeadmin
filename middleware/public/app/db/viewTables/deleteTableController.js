angular.module('nodeadmin.db.deleteTable', [])
  .controller('DeleteTableController', function($scope, $modalInstance, $stateParams, Tables) {

  $scope.ok = function() {
    // Drop table
    var dropTable = Tables.returnDropTableName();
    Tables.dropTable($stateParams.database, dropTable);
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
