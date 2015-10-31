angular.module('nodeadmin.settings.users', [])
  .controller('UsersController', ['$scope', 'Users', '$uibModal',
    function($scope, Users, $uibModal) {
      $scope.headers = [];
      $scope.users = [];

      $scope.getAll = function() {
        Users.getAll()
          .then(function(result) {
            $scope.users = result;
          })
          .catch(function(err) {
            $scope.error = err.data;
          });
      };
      $scope.getAll();

      // Editing user cells
      $scope.oldData = '';
      $scope.newData = '';
      $scope.column = '';
      $scope.row = {};

      $scope.editCell = function(id, column, oldData, user) {
        $scope.isEditing = id;
        $scope.oldData = oldData;
        $scope.column = column;
        $scope.row = user;
      };

      $scope.saveCell = function(column, newData) {
        $scope.newData = newData;

        // If column passed in doesn't match what was assigned in editCell 
        if (column !== $scope.column) {
          $scope.error = 'Error editing user.';
          return;
        }

        var update = {
          column: $scope.column,
          oldData: $scope.oldData,
          newData: $scope.newData,
          row: $scope.row
        };

        Users.editUser(update)
          .then(function(result) {
            // Update view
            $scope.success = 'Successfully updated user information.';
            $scope.getAll();
          })
          .catch(function(err) {
            $scope.error = err.data;
          });

        $scope.isEditing = false;
      };

      $scope.cancel = function() {
        $scope.isEditing = false;
      };

      // Grants modal
      $scope.openGrants = function(user) {
        Users.saveGrantInfo(user);

        var grantsModalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/settings/users/viewPrivileges.html',
          controller: 'ViewPrivilegesController',
        });
      };

      // Add user modal
      $scope.openAddUser = function() {
        var addUserModalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/settings/users/addUser.html',
          controller: 'AddUserController',
        });

        addUserModalInstance.result.then(function(result) {
          if (result === true) {
            // Reload current users
            $scope.users = [];
            $scope.getAll();
            $scope.success = 'Successfully added a new user.';
          } else {
            $scope.error = result.data;
          }
        });
      };

      // Delete user modal
      $scope.openDeleteUser = function(user) {
        Users.saveDeleteUser(user);
        var deleteUserModalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/settings/users/deleteUser.html',
          controller: 'DeleteUserController',
        });

        deleteUserModalInstance.result.then(function(result) {
          if (typeof result === 'string') {
            // TODO: Reload updated users
            // $scope.users = [];
            // $scope.getAll();
            $scope.success = result;
          } else {
            $scope.error = result.data;
          }
        });
      };
    }

  ]);
