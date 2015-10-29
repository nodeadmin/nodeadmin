angular.module('nodeadmin.db.createdb', [])
.controller('DBCreateController', function ($scope, $modalInstance, DatabaseFactory, state) {

  $scope.database = {};

  $scope.create = function() {
    
    var validDBreg = /^[\S].+(?![\S]$)/;
    var name = $scope.database.name;

    if(name.match(validDBreg) && name.match(' ') === null) {
      DatabaseFactory.createDB($scope.database)
        .then(function (res) {
          // close modal and send mysql response
          $modalInstance.close(res);
        })
        .catch(function (error) {
          $modalInstance.close(error);
        })
    } else {
      // TODO: error handling
    }
    
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

})
