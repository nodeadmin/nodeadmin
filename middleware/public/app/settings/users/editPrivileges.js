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

    $scope.editCell = function (id, column) {
       $scope.isEditing = id;
       $scope.column = column;
    };

    $scope.cancel = function() {
      $scope.isEditing = false;
    };

    $scope.saveCell = function (column, data) {
     $scope.column = column;
      
      var update = {
        column: $scope.column,
        val: data
      };

      Users.editGrantsRecord($scope.user, $scope.host, update)
      .then(function (result) {
        $scope.success = 'Successfully updated user privileges.';
      })
      .catch(function (err) {
        console.log(err);
        $scope.error = err;
      });
      $scope.isEditing = false;
    };

    // Display description of grants options
    $scope.getGrantsDescription = function() {
      Users.getGrantsDescription()
        .then(function(result) {
          console.log('show privileges:' , result)
          $scope.showPrivileges = result;
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.getGrantsDescription();
  });
