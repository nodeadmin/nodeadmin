angular.module('nodeadmin.db.createdb', [])
.controller('DBCreateController', function ($scope, $modalInstance, DatabaseFactory, state) {

  $scope.database = {};

  $scope.create = function() {
    
    var validDBreg = /^[\S].+(?![\S]$)/;
    var name = $scope.database.name;

    if(name.match(validDBreg) && name.match(' ') === null) {
      DatabaseFactory.createDB($scope.database)
        .then(function (res) {
          state.transitionTo('dbhome', {success: res}, { reload: true});
          $modalInstance.close(res);
        });
    } else {
      // TODO: error handling
    }
    
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

})
