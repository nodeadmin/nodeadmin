angular.module('nodeadmin.db.deletedb', [])
.controller('DBDeleteController', function ($scope, $uibModalInstance, DatabaseFactory, databases) {

  $scope.data = {
    repeatSelect: null,
    availableOptions: databases,
  };

  $scope.delete = function(db) {
    
    DatabaseFactory.deleteDB({name:$scope.data.repeatSelect})
      .then(function (res) {
        var ind = databases.map(function (db) { return db.Database; }).indexOf($scope.data.repeatSelect);
        databases.splice(ind, 1);
        $uibModalInstance.close(res);
      })
      .catch(function (error) {
        $uibModalInstance.close(error);
      })
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };


})
