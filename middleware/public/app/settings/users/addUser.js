angular.module('nodeadmin.settings.adduser', [])
  .controller('AddUserController', function($scope, Users, $modalInstance, $state) { 

    $scope.user = {};

    $scope.addUser = function() {
      console.log('user', $scope.user)
      Users.addUser($scope.user)
        .then(function(response) {
          $modalInstance.close(response);
        })
        .catch(function(err) {
          $scope.error = err.data;
        });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('close');
    };

    $scope.editPrivileges = function() {
      if (!$scope.error) {
        $state.go('grants', {user: $scope.user.user, host: $scope.user.host});
      }
    };

  });

