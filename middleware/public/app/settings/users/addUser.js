angular.module('nodeadmin.settings.adduser', [])
  .controller('AddUserController', function($scope, Users, $modalInstance, $state, AlertCenter) { 

    $scope.user = {};

    AlertCenter.addAll($scope);

    $scope.addUser = function() {
      console.log('user', $scope.user)
      Users.addUser($scope.user)
        .then(function(response) {
          $modalInstance.close(response);
        })
        .catch(function(err) {
          // $scope.error = err.data;
          console.log(err);
          $scope.alerts.error.push({
            status: '400',
            msg: err.data
          })
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

