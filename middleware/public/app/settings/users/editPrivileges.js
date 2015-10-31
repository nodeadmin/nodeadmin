angular.module('nodeadmin.settings.editprivileges', [])
  .controller('EditPrivilegesController', function($scope, $stateParams) {
    $scope.user = $stateParams.user;
    $scope.host = $stateParams.host;
    console.log($scope.user, $scope.host)
  });
