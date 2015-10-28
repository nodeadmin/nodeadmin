angular.module('nodeadmin.db.deletedb', [])
.controller('DBDeleteController', function ($scope, $modalInstance, DatabaseFactory, databases) {

  $scope.data = {
    repeatSelect: null,
    availableOptions: databases,
  };

  $scope.delete = function(db) {
    
    DatabaseFactory.deleteDB({name:$scope.data.repeatSelect})
      .then(function (res) {
        var ind = databases.map(function (db) { return db.Database; }).indexOf($scope.data.repeatSelect);
        databases.splice(ind, 1);
        $modalInstance.close(res);
      });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };


})
