angular.module('nodeadmin.db.deleteTable', [])
  .controller('DeleteTableController', function($scope, $modalInstance, Tables) {

  $scope.ok = function() {
    // Drop table
    console.log('tablename inside deletetable controller: ', tableName)
    Tables.dropTable($stateParams.database, tableName);
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
