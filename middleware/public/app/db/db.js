/* jshint strict: false */
angular.module('nodeadmin.db', [])
.factory('dbFactory', function ($http) {
  return {
    getDatabases: function () {
      return $http({
        method: 'GET',
        url: '/nodeadmin/api/db/connect'
      });
    }
  };
})
.controller('DBController', ['$scope', 'dbFactory',
  function ($scope, dbFactory) {

    // console.log(dbFactory);
    $scope.databases = [];

    $scope.menu = false;

    $scope.toggleMenu = function () {
      $scope.menu = !$scope.menu;
    };

    $scope.loadDatabases = function () {
      dbFactory.getDatabases()
        .then(function (dbs) {
          $scope.databases = dbs.data;
        });
    };

    $scope.loadDatabases();

  }
]);
