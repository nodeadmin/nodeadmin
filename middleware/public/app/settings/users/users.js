angular.module('nodeadmin.settings.users', [])
  .controller('UsersController', ['$scope', 'Users', '$uibModal', 'AlertCenter',
    function($scope, Users, $uibModal, AlertCenter) {
      $scope.headers = [];
      $scope.users = [];

      AlertCenter.addAll($scope);

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

        Users.editUser(update, $scope.row.user, $scope.row.host)
          .then(function(result) {
            // Update view
            $scope.alerts.success.push({
              msg: 'Successfully updated user information.',
              status: '200'
            });
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
          // Only results on success - errors handled in modal
          if (result) {
            // Reload current users
            $scope.users = [];
            $scope.getAll();
            // $scope.success = 'Successfully added a new user.';
            $scope.alerts.success.push({
              msg: 'Successfully added a new user.',
              status: '200'
            });
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
          if (result) {
            // Refresh users 
            $scope.users = [];
            $scope.getAll();
            // $scope.success = 'Successfully deleted a user.';
            $scope.alerts.success.push({
              msg: 'Successfully deleted a user.',
              status: '200'
            });

          } else {
            // TODO: figure out how errors would come in from query
            // $scope.error = result.data;
            $scope.alerts.error.push({
              msg: result.data,
              status: '400'
            });
          }
        });
      };
    }

  ]);
