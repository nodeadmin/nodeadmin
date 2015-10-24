angular.module('nodeadmin.system', [])

.controller('SystemController', ['$scope', '$state', 'System', function ($scope, $state, System) {

  $scope.getModules = function() {
    System.getModules()
    .then(function(modules) {
      console.log('what are the modules? ', modules);
      $scope.modules = modules.data;
    })
    .catch(function(err) {
      console.error(err.data.error);
      // Allow for error displaying on modules page
      $scope.error = err.data.error;
    })
  };
  
  $scope.subState = function (stateName) {
    $state.transitionTo(stateName);
  };

  $scope.toggleMenu = function () {
    $scope.menu = !$scope.menu;
  };
  $scope.menu = true;

  // Get modules on load
  $scope.getModules();
}]);
