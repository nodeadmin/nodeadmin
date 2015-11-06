angular.module('nodeadmin.db.createdb', [])
.controller('DBCreateController', function ($scope, $uibModalInstance, DatabaseFactory, state) {

  $scope.database = {};

  $scope.create = function() {
    
    var validDBreg = /^[\S].+(?![\S]$)/;
    var name = $scope.database.name;

    if(name.match(validDBreg) && name.match(' ') === null) {
      DatabaseFactory.createDB($scope.database)
        .then(function (res) {
          // close modal and send mysql response
          $uibModalInstance.close(res);
        })
        .catch(function (error) {
          $uibModalInstance.close(error);
        })
    } else {
      // TODO: error handling
    }
    
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

})
