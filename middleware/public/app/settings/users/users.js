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
        // console.log('id', id, column, oldData);
      };

      $scope.saveCell = function(column, newData) {
        // console.log('save', column, newData)
        $scope.newData = newData;

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
            $scope.success = 'Successfully updated user information.'
            $scope.getUsers();
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
          templateUrl: 'app/settings/users/grants.html',
          controller: 'GrantsController',
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
            $scope.getUsers();
            $scope.success = 'Successfully added a new user.';
          } else {
            $scope.error = result.data;
          }
        });
      };

      // Delete user modal
      $scope.openDeleteUser = function(user) {
        Users.saveDeleteUser(user);
        console.log($scope.deleteUser)
        var deleteUserModalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/settings/users/deleteUser.html',
          controller: 'DeleteUserController',
        });
      // };

        // deleteUserModalInstance.result.then(function(result) {
        //   if (result === true) {
        //     // Reload current users
        //     $scope.users = [];
        //     $scope.getUsers();
        //     $scope.success = 'Successfully added a new user.';
        //   } else {
        //     $scope.error = result.data;
        //   }
        // });
      };
    }

  ]);
