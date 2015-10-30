angular.module('nodeadmin.settings.deleteUser', [])
  .controller('DeleteUserController', function($scope, $modalInstance, Users) {

  $scope.deleteUser = Users.getDeleteUser();

  $scope.ok = function() {
    console.log('ok')
    // Drop table
    // Tables.dropTable($stateParams.database, $scope.dropTable)
    //   .then(function(droppedTable) {
    //     $modalInstance.close(droppedTable);
    //   })
    //   .catch(function(err) {
    //     $modalInstance.close(err);
    //   });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
