angular.module('nodeadmin.db.createtable', [])
.controller('CreateTableViewController', ['$scope', '$uibModal', '$stateParams', 'Tables', function ($scope, $uibModal, $stateParams, Tables) {

    $scope.fields = [{}];

    $scope.addField = function(num) {

      do {
        $scope.fields.push({});
        
      } while(--num);
      
    };

  }
]);
