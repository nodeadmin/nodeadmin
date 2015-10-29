angular.module('nodeadmin.settings.users', [])
  .controller('UsersController', ['$scope', 'Users',
    function($scope, Users) {
      $scope.primaryKey = [];

      $scope.getUsers = function() {
        Users.getUsers()
          .then(function(result) {
            console.log('result', result)
            $scope.users = result[0];
            $scope.headers = result[1];
            $scope.getPrimaryKey($scope.headers);
          })
          .catch(function(err) {
            $scope.error = err.data;
          });
      };
      $scope.getUsers();

      $scope.getPrimaryKey = function(headers) {
        for (var i = 0; i < headers.length; i++) {
          if (headers[i].Key === 'PRI') {
            $scope.primaryKey.push(headers[i].Field);
          }
        }
      };
    }
  ]);
