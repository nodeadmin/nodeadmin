angular.module('nodeadmin.db.deleteTable', [])
  .controller('DeleteTableController', function($scope, $uibModalInstance) {

  $scope.ok = function() {
    // drop table
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});
