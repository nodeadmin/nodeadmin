angular.module('nodeadmin.settings.deleteUser', [])
  .controller('DeleteUserController', function($scope, $modalInstance, Users) {

  $scope.deleteUser = Users.getDeleteUser();

  $scope.ok = function() {
    Users.deleteUser($scope.deleteUser.user, $scope.deleteUser.host)
      .then(function(result) {
        $modalInstance.close(result);
      })
      .catch(function(err) {
        $modalInstance.close(err);
      });    
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
