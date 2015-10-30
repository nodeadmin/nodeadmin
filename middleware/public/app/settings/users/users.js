angular.module('nodeadmin.settings.users', [])
  .controller('UsersController', ['$scope', 'Users', '$uibModal',
    function($scope, Users, $uibModal) {
      $scope.headers = [];

      $scope.getUsers = function() {
        Users.getUsers()
          .then(function(result) {
            console.log('result', result)

            $scope.users = result;

          })
          .catch(function(err) {
            $scope.error = err.data;
          });
      };
      $scope.getUsers();

      // Grants modal
      $scope.animationsEnabled = true;

      $scope.open = function(user) {
        // user.user
        // user.host
        Users.saveGrantInfo(user);

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/settings/users/grants.html',
          controller: 'GrantsController',
        });
      };

      $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };
    }

  ]);

// view grants per user
// update grants/privileges per user
// revoke user
// call flush privileges to save new grants

// create user
// set/change password
// rename user
// MySQL user names can be up to 16 characters long.
// drop user
