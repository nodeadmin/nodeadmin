angular.module('nodeadmin.db.viewTables', [])
  .controller('TableViewController', ['$scope', '$uibModal',
    function($scope, $uibModal) {

      $scope.animationsEnabled = true;

      $scope.open = function(size) {

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'deleteTable.html',
          controller: 'DeleteTableController',
          size: size,
          resolve: {
            
          }
        });
      };

      $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };
    }
  ])

// on load should display all tables in selected db (by dbname in url)
