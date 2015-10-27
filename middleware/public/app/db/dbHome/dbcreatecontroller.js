angular.module('nodeadmin.db.createdb', [])
.controller('DBCreateController', function ($scope, $modalInstance, Database) {

  $scope.database = {};

  $scope.create = function() {
    
    var validDBreg = /^[\S].+(?![\S]$)/;
    var name = $scope.database.name;

    if(name.match(validDBreg) && name.match(' ') === null) {
      Database.createDB($scope.database)
        .then(function (res) {
          $modalInstance.close(res.data);
        });
    } else {
      // TODO: error handling
    }
    
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

})
