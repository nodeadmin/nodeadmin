angular.module('nodeadmin.db.deletedb', [])
.controller('DBDeleteController', function ($scope, $modalInstance, Database, dbFactory) {

  $scope.data = {
    repeatSelect: null,
    availableOptions: [],
  };

  $scope.delete = function(db) {

    var toDelete = $scope.data.availableOptions.filter(function (val) {
      return val.id == $scope.data.repeatSelect;
    })[0];
    
    Database.deleteDB(toDelete)
      .then(function (res) {
        $modalInstance.close(res.data);
      });
  };

  $scope.getDatabases = function() {
    dbFactory.getDatabases()
      .then(function (res) {
        console.log('got databases for controller delete', res);
        $scope.data.availableOptions = res.data.map(function (db, ind ) {
          return { id:ind, name: db.Database };
        });
      });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.getDatabases();

})
