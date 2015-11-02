angular.module('nodeadmin.settings.viewprivileges', [])
  .controller('ViewPrivilegesController', function($scope, Users, $modalInstance) {
    
    var grantUser = Users.returnGrantUser();
    $scope.user = grantUser.user;
    $scope.host = grantUser.host;
    $scope.grants = [];

    $scope.saveGrantInfo = function(user) {
      Users.saveGrantInfo(user);
    };

    $scope.getGrants = function() {
      Users.getGrants($scope.user, $scope.host)
        .then(function(result) {
          for (var i = 0; i < result.length; i++) {
            for (var key in result[i]) {
              $scope.grants.push(result[i][key]);
            }
            result[i].toString();
          }
        })
        .catch(function(err) {
          $modalInstance.close(err);
        });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('close');
    };

    $scope.getGrants();
});
