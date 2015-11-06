angular.module('nodeadmin.settings.deleteUser', [])
  .controller('DeleteUserController', function($scope, $uibModalInstance, Users) {

  $scope.deleteUser = Users.getDeleteUser();

  $scope.ok = function() {
    Users.deleteUser($scope.deleteUser.user, $scope.deleteUser.host)
      .then(function(result) {
        $uibModalInstance.close(result);
      })
      .catch(function(err) {
        $uibModalInstance.close(err);
      });    
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});
