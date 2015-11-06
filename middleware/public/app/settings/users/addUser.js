angular.module('nodeadmin.settings.adduser', [])
  .controller('AddUserController', function($scope, Users, $uibModalInstance, $state, AlertCenter) { 

    $scope.user = {};

    AlertCenter.addAll($scope);

    $scope.addUser = function() {
      Users.addUser($scope.user)
        .then(function(response) {
          $uibModalInstance.close(response);
        })
        .catch(function(err) {
          // $scope.error = err.data;
          console.error(err.data);
          $scope.alerts.error.push({
            status: '400',
            msg: err.data
          })
        });
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('close');
    };

    $scope.editPrivileges = function() {
      if (!$scope.error) {
        $state.go('grants', {user: $scope.user.user, host: $scope.user.host});
      }
    };

  });

