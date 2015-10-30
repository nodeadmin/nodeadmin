angular.module('nodeadmin.settings.deleteUser', [])
  .controller('DeleteUserController', function($scope, $modalInstance, Tables) {

  $scope.deleteUser; // = ?? grab from Users ?

  $scope.ok = function() {
    // Drop table
    Tables.dropTable($stateParams.database, $scope.dropTable)
      .then(function(droppedTable) {
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
