angular.module('nodeadmin.settings.grants', [])
  .controller('GrantsController', function($scope, Users, $modalInstance) {
    
    var grantUser = Users.returnGrantUser();
    $scope.user = grantUser.user;
    $scope.host = grantUser.host;

    $scope.getGrants = function() {
      Users.getGrants($scope.user, $scope.host)
        .then(function(result) {
          console.log('grants result', result)
          $scope.grants = result;
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
