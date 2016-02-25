angular.module('nodeadmin.db.dbhome', [])
.controller('DBHomeController', ['$scope', 'DBInfoFactory', '$uibModal','$state', 'AlertCenter',
  function ($scope, DBInfoFactory, $uibModal, $state, AlertCenter) {

    $scope.animationsEnabled = true;
    
    AlertCenter.addAll($scope);

    $scope.open = function(type) {
      if(type === 'createDB') {

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/db/dbhome/dbcreate.html',
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
            var message = (results.status < 400 && results.status >= 200) ? 'success' : 'error';
            $scope.alerts[message].push({
              msg:(results.data.code ? results.data.code + " - " : '') + results.statusText,
              status:results.status
            });
          });
      }
      else if(type === 'deleteDB') {


        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/db/dbhome/dbdelete.html',
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
            var message = (results.status < 400 && results.status >= 200) ? 'success' : 'error'
            $scope.alerts[message].push({
              msg:(results.data.code ? results.data.code + " - " : '') + results.statusText,
              status:results.status
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
        for (var i = 0; i < infoData.length; i++) {
          delete infoData[i]['HOST'];
        }
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
