angular.module('nodeadmin.settings.editprivileges', [])
  .controller('EditPrivilegesController', function($scope, $stateParams, Users, RecordsFactory) {
    $scope.user = $stateParams.user;
    $scope.host = $stateParams.host;
    $scope.headers = [];
    
    Users.getGrantsRecord($scope.user, $scope.host)
      .then(function(response) {
        $scope.success = '';
        console.log(response)
        $scope.record = response[0];
        // Describe table
        $scope.headers = response[1];
      })
      .catch(function(err) {
        $scope.error = err;
      });

    $scope.editCell = function (id) {
       $scope.isEditing = id;
    };

    $scope.saveCell = function (data, index, id) {
      var update = {
        table: 'user',
        col: $scope.headers[index].Field,
        val: data,
        pk: $scope.user
      };
      RecordsFactory.editRecord('mysql', 'user', update)
      .then(function (result) {
        $scope.success = 'Successfully updated user privileges.';
      })
      .catch(function (err) {
        console.log(err);
      });
      $scope.isEditing = false;
    };
  });
