angular.module('nodeadmin.db.deleteTable', [])
  .controller('DeleteTableController', function($scope, $modalInstance) {

  $scope.ok = function() {
    // drop table
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
