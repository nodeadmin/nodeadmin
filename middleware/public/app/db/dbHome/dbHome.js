angular.module('nodeadmin.db.dbhome', [])
.controller('DBHomeController', ['$scope', 'DBInfoFactory', '$uibModal','$state',
  function ($scope, DBInfoFactory, $uibModal, $state) {

    $scope.animationsEnabled = true;

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
            // refresh parent view sidebar to ensure DB was created properly
            $scope.$parent.loadDatabases();
            // set success message
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
            // set success message
            $scope.success = results;
          });
      }
    };

    var perfData;
    DBInfoFactory.getPerformanceTimers()
    .then(function (data) {
      var perfData = data;
      $scope.perfHeaders = Object.keys(perfData[0]);
      $scope.perfRows = perfData;
    });
    DBInfoFactory.getInfo()
    .then(function (data) {
      var infoData = data;
      delete infoData[0]['INFO'];
      $scope.infoHeaders = Object.keys(infoData[0]);
      $scope.infoRows = infoData;
    });
  }
]);
