angular.module('nodeadmin', [
  'nodeadmin.home',
  'nodeadmin.system',
  'nodeadmin.settings',
  'nodeadmin.db'
])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '',
        controller: ''
      })
      .when('/system', {
        templateUrl: '',
        controller: ''
      })
      .when('/settings', {
        controller: ''
      })
      .when('/db', {
        controller: ''
      })
      .otherwise('/setup');
  })

