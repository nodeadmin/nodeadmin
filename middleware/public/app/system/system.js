angular.module('nodeadmin.system', [])
.controller('SystemController', ['$scope', 'System', function ($scope, System) {
  $scope.system = {};

  $scope.getModules = function() {
    System.getModules()
    .then(function(modules) {
      console.log('what are the modules? ', modules);
    })
    .catch(function(err) {
      console.error(err.data.error);
      // Allow for error displaying on modules page
      $scope.error = err.data.error;
    })
  }

}]);
