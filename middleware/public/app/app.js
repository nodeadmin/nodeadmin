angular.module('nodeadmin', [
  // 'nodeadmin.home',
  // 'nodeadmin.system',
  // 'nodeadmin.settings',
  // 'nodeadmin.db',
  'nodeadmin.services',
  'nodeadmin.auth',
  'ui.router',
  'ui.bootstrap'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('setup', {
      url: '/setup',
      templateUrl: './app/auth/setup.html',
      controller: 'AuthController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '',
      controller: ''
    })
    .state('main', {
      url: '/',
      templateUrl: '',
      controller: ''
    })

    .state('main.settings', {
      url: '/settings',
      templateUrl: '',
      controller: ''
    })
    .state('main.settings.users', {
      url: '/settings/users',
      templateUrl: '',
      controller: ''
    })
    .state('main.settings.notifications', {
      url: '/settings/notifications',
      templateUrl: '',
      controller: ''
    })
    .state('main.settings.advanced', {
      url: '/settings/advanced',
      templateUrl: '',
      controller: ''
    })

    .state('main.system', {
      url: '/system',
      templateUrl: '',
      controller: ''
    })
    .state('main.system.logs', {
      url: '/system/logs',
      templateUrl: '',
      controller: ''
    })
    .state('main.system.fs', {
      url: '/system/fs',
      templateUrl: '',
      controller: ' '
    })

    .state('main.db', {
      url: '/db',
      templateUrl: '',
      controller: ''
    })
    .state('main.db.tables', {
      url: '/db/tables',
      templateUrl: '',
      controller: ''
    })
    .state('main.db.createTable', {
      url: '/db/createTable',
      templateUrl: '',
      controller: ''
    })
    .state('main.db.records', {
      url: '/db/records',
      templateUrl: '',
      controller: ''
    })
   
   $urlRouterProvider.otherwise('/setup');
});

// check isAuth on each state change

