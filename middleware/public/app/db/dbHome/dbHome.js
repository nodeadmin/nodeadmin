angular.module('nodeadmin.db.dbhome', [])
.controller('DBHomeController', ['$scope', 'DBInfoFactory', '$uibModal','$state',
  function ($scope, DBInfoFactory, $uibModal, $state) {

    $scope.animationsEnabled = true;
    
    $scope.alerts = {
      error:[],
      success:[]
    };

    $scope.closeAlert = function(type, index) {
      $scope.alerts[type].splice(index, 1);
    };

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
            
            $scope.alerts[results.status === 200 ? 'success' : 'error'].push({
              msg:results.statusText,
              status:results.status,
              method:results.config.method,
            });
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
            $scope.alerts[results.status === 200 ? 'success' : 'error'].push({
              msg:results.statusText,
              status:results.status,
              method:results.config.method,
            });
          });
      }
    };
    var trackPerformance = function () {
      DBInfoFactory.getPerformanceTimers()
      .then(function (data) {
        var perfData = data;
        $scope.perfHeaders = Object.keys(perfData[0]);
        $scope.perfRows = perfData;
      });
    };
    trackPerformance();
    var performanceTracker = setInterval(trackPerformance, 500);
    var trackInfo = function () {
      DBInfoFactory.getInfo()
      .then(function (data) {
        var infoData = data;
        delete infoData[0]['HOST'];
        $scope.infoHeaders = Object.keys(infoData[0]);
        $scope.infoRows = infoData;
      });
    };
    trackInfo();
    var infoTracker = setInterval(trackInfo, 500);

    $scope.$on("$destroy", function () {
      clearInterval(performanceTracker);
      clearInterval(infoTracker);
    });

  }
]);
