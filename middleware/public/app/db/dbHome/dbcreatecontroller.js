angular.module('nodeadmin.db.createdb', [])
.controller('DBCreateController', function ($scope, $modalInstance) {

  $scope.create = function() {
    // todo: validate db name.. ie no spaces
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

})
