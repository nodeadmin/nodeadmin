angular.module('nodeadmin.settings.users', [])
  .controller('UsersController', ['$scope', 'Users',
    function($scope, Users) {
      $scope.getUsers = function() {
        Users.getUsers()
          .then(function(result) {
            console.log('result', result)
          })
          .catch(function(err) {
            $scope.error = err.data;
          })
      };
      $scope.getUsers();
    }
  ]);
