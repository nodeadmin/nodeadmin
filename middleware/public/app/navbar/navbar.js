angular.module('nodeadmin.navbar', [])
.controller('NavController', ['$scope', '$window', '$state', function ($scope, $window, $state) {
  $scope.logout = function() {
    $window.localStorage.removeItem('nodeadmin');
    $state.transitionTo('login');
  };

  $scope.homeActive = true;
  $scope.dBActive = false;
  $scope.systemActive = false;
  $scope.settingsActive = false;
  $scope.activeTab = 'Home';

  $scope.setActiveTab = function (tabName) {
    console.log(tabName);
    $scope.activeTab = tabName;
    if (tabName === 'Home') {
      $scope.homeActive = true;
    } else {
      $scope.homeActive = false;
    }

    if (tabName === 'DB') {
      $scope.dBActive = true;
    } else {
      $scope.dBActive = false;
    }

    if (tabName === 'System') {
      $scope.systemActive = true;
    } else {
      $scope.systemActive = false;
    }

    if (tabName === 'Settings') {
      $scope.settingsActive = true;
    } else {
      $scope.settingsActive = false;
    }
    // console.log('Home:',$scope.homeActive,' DB:',$scope.dBActive,' System:',$scope.systemActive,' Settings:',$scope.settingsActive);
  }
}]);
