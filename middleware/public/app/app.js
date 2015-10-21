angular.module('nodeadmin', [
  // 'nodeadmin.home',
  // 'nodeadmin.system',
  // 'nodeadmin.settings',
  // 'nodeadmin.db',
  'nodeadmin.auth',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("home");
   $stateProvider 
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'homeController'
      })
      .state('system', {
        url: '/system',
        templateUrl: '',
        controller: ''
      })
      .state('settings', {
        url: '/settings',
        templateUrl: '',
        controller: ''
      })
      .state('db', {
        url: '/db',
        templateUrl: '',
        controller: ''
      })
      .state('setup', {
        url: '/setup',
        views: {
          content: {
            templateUrl: './app/auth/setup.html',
            controller: 'AuthController'
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: '',
        controller: ''
      })
      .state('settings/users', {
        url: '/settings/users',
        templateUrl: '',
        controller: ''
      })
      .state('settings/notifications', {
        url: '/settings/notifications',
        templateUrl: '',
        controller: ''
      })
      .state('settings/advanced', {
        url: '/settings/advanced',
        templateUrl: '',
        controller: ''
      })
      .state('system/logs', {
        url: '/system/logs',
        templateUrl: '',
        controller: ''
      })
      .state('system/fs', {
        url: '/system/fs',
        templateUrl: '',
        controller: ' '
      })
      .state('db/tables', {
        url: '/db/tables',
        templateUrl: '',
        controller: ''
      })
      .state('db/createTable', {
        url: '/db/createTable',
        templateUrl: '',
        controller: ''
      })
      .state('db/records', {
        url: '/db/records',
        templateUrl: '',
        controller: ''
      })
     
     $urlRouterProvider.otherwise('/setup');
  });

