angular.module('nodeadmin.system.modules', [])
.controller('ModulesController', ['$scope', 'System', function ($scope, System) {

$scope.getModules = function() {
  System.getModules()
  .then(function(modules) {
    $scope.modules = modules.data;
  })
  .catch(function(err) {
    console.error(err.data.error);
    // Allow for error displaying on modules page
    $scope.error = err.data.error;
  })
};

// Get modules on load
$scope.getModules();
}]);
