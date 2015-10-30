angular.module('nodeadmin.settings.adduser', [])
  .controller('AddUserController', function($scope, Users, $modalInstance) { 

    $scope.user = {};

    $scope.addUser = function() {
      Users.addUser($scope.user)
        .then(function(response) {
          $modalInstance.close(response);
        })
        .catch(function(err) {
          $modalInstance.close(err);
        });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('close');
    };

  });
