angular.module('nodeadmin.system', [])
.controller('SystemController', ['$scope', 'System', function ($scope, System) {
  $scope.modules = {};

  $scope.getModules = function() {
    System.getModules()
    .then(function(modules) {
      console.log('what are the modules? ', modules);
      $scope.modules = modules;
    })
    .catch(function(err) {
      console.error(err.data.error);
      // Allow for error displaying on modules page
      $scope.error = err.data.error;
    })
  },

  $scope.toggleMenu = function () {
    $scope.menu = !$scope.menu;
  }
  $scope.menu = false;

  // Get modules on load
  $scope.getModules();
}]);
