angular.module('nodeadmin.settings.users', [])
  .controller('UsersController', ['$scope', 'Users', '$uibModal',
    function($scope, Users, $uibModal) {
      $scope.headers = [];
      $scope.users = [];

      $scope.getUsers = function() {
        Users.getUsers()
          .then(function(result) {
            $scope.users = result;
          })
          .catch(function(err) {
            $scope.error = err.data;
          });
      };
      $scope.getUsers();

      $scope.animationsEnabled = true;

      // Grants modal
      $scope.openGrants = function(user) {
        Users.saveGrantInfo(user);

        var grantsModalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/settings/users/grants.html',
          controller: 'GrantsController',
        });
      };

      $scope.openAddUser = function() {
        var addUserModalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/settings/users/addUser.html',
          controller: 'AddUserController',
        });

        addUserModalInstance.result.then(function(result) {
          if (result === true) {
            // Reload current users
            $scope.users = [];
            $scope.getUsers();
            $scope.success = result;
          } else {
            $scope.error = result.data;            
          }
        });

        $scope.toggleAnimation = function() {
          $scope.animationsEnabled = !$scope.animationsEnabled;
        };
      };
    }

  ]);


// update grants/privileges per user
// revoke user
// call flush privileges to save new grants

// create user
// update after adding new user

// set/change password
// rename user
// MySQL user names can be up to 16 characters long.
// drop user
