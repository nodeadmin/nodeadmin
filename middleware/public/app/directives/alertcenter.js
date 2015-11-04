angular.module('nodeadmin.alertcenter', [])
.controller('AlertCenterController', ['$scope', function ($scope) {

  $scope.alerts = '='; //binds to passed in object
  //alerts must have a msg and a status property

    $scope.closeAlert = function(type, index) {
      $scope.alerts[type].splice(index, 1);
    };

}])
.directive('alertCenter', function () {
  return { 
    templateUrl: 'app/directives/alertcenter.html'
  }
});


