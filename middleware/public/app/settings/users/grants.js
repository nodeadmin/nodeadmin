angular.module('nodeadmin.settings.grants', [])
  .controller('GrantsController', function($scope, Users, $modalInstance) {
    
    var grantUser = Users.returnGrantUser();
    $scope.user = grantUser.user;
    $scope.host = grantUser.host;
    $scope.grants = [];

    $scope.getGrants = function() {
      Users.getGrants($scope.user, $scope.host)
        .then(function(result) {
          console.log('grants result', result)
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
