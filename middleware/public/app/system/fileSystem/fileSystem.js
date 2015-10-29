angular.module('nodeadmin.system.fileSystem', [])
  .controller('FileSystemController', ['$scope', 'System', function($scope, System) {

    $scope.getFileSystem = function() {
      System.getFileSystem()
        .then(function(result) {
          $scope.files = result;
          console.log('result', result);
        });
    };

    $scope.getFileSystem();

  }]);
