angular.module('nodeadmin.db.dbhome', [])
.controller('DBHomeController', ['$scope', 'DBInfoFactory', '$uibModal','$state','$stateParams',
  function ($scope, DBInfoFactory, $uibModal, $state, $stateParams) {

    $scope.animationsEnabled = true;

    $scope.$on('$stateChangeSuccess', function(event, unfoundState, fromState, fromParams) {
      debugger
    })

    $scope.open = function(type) {
      if(type === 'createDB') {

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/db/dbHome/dbcreate.html',
          controller: 'DBCreateController',
          size: 'sm',
          resolve: {
            state:'$state'
          }
        });

        modalInstance.result
          .then(function (results){
            $scope.success = results;
          });
      }
      else if(type === 'deleteDB') {


        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/db/dbHome/dbdelete.html',
          controller: 'DBDeleteController',
          size: 'sm',
          resolve: {
            databases: function() {
              return $scope.$parent.databases;
            }
          }
        });

        modalInstance.result
          .then(function (results) {
            $scope.success = results;
          });
      }
    };

    var perfData;
    DBInfoFactory.getPerformanceTimers()
    .then(function (data) {
      var perfData = data;
      // console.log(perfData);
      $scope.perfHeaders = Object.keys(perfData[0]);
      $scope.perfRows = perfData;
    });
    DBInfoFactory.getInfo()
    .then(function (data) {
      var infoData = data;
      // console.log(infoData);
      delete infoData[0]['INFO'];
      $scope.infoHeaders = Object.keys(infoData[0]);
      $scope.infoRows = infoData;
    });
  }
]);
