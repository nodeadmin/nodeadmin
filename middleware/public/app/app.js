angular.module('nodeadmin', [
  'nodeadmin.services',
  'nodeadmin.togglemenu',
  'nodeadmin.socket',
  'nodeadmin.home',
  'nodeadmin.auth',
  'nodeadmin.main',
  'nodeadmin.settings',
  'nodeadmin.system',
  'nodeadmin.system.modules',
  'nodeadmin.system.logs',
  'nodeadmin.db',
  'nodeadmin.db.dbhome',
  'nodeadmin.db.createdb',
  'nodeadmin.db.deletedb',
  'nodeadmin.db.viewTables',
  'nodeadmin.db.createtable',
  'nodeadmin.db.deleteTable',
  'nodeadmin.db.query',
  'ui.router',
  'ui.bootstrap',
  'chart.js'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: './app/auth/login.html',
      controller: 'AuthController',
      data: {
        requireLogin: false
      }
    })

    .state('main', {
      abstract: true,
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'AuthController',
      data: {
        requireLogin: true
      }
    })

    .state('home', {
      parent: 'main',
      url: '',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      data: {
        requireLogin: true
      }
    })

    .state('settings', {
      parent: 'main',
      url: 'settings',
      templateUrl: 'app/settings/settings.html',
      controller: 'SettingsController',
      data: {
        requireLogin: true
      }
    })
    .state('users', {
      parent: 'settings',
      url: 'settings/users',
      templateUrl: '',
      controller: '',
      data: {
        requireLogin: true
      }
    })
    .state('notifications', {
      parent: 'settings',
      url: 'settings/notifications',
      templateUrl: '',
      controller: '',
      data: {
        requireLogin: true
      }
    })
    .state('advanced', {
      parent: 'settings',
      url: 'settings/advanced',
      templateUrl: '',
      controller: '',
      data: {
        requireLogin: true
      }
    })

    .state('system', {
      abstract: true,
      parent: 'main',
      url: 'system',
      templateUrl: 'app/system/system.html',
      controller: 'SystemController',
      data: {
        requireLogin: true
      }
    })
    .state('modules', {
      parent: 'system',
      url: '',
      templateUrl: 'app/system/modules/modules.html',
      controller: 'ModulesController',
      data: {
        requireLogin: true
      }
    })
    .state('logs', {
      parent: 'system',
      url: '/logs',
      templateUrl: 'app/system/serverLogs/serverLogs.html',
      controller: 'LogsController',
      data: {
        requireLogin: true
      }
    })

    .state('db', {
      abstract: true,
      parent: 'main',
      url: 'db',
      templateUrl: 'app/db/db.html',
      controller: 'DBController',
      data: {
        requireLogin: true
      }
    })
    .state('dbhome', {
      parent: 'db',
      url: '',
      templateUrl: 'app/db/dbHome/dbHome.html',
      controller: 'DBHomeController',
      data: {
        requireLogin: true
      }
    })
    .state('tables', {
      parent: 'db',
      url: '/:database',
      templateUrl: 'app/db/viewTables/viewTables.html',
      controller: 'TableViewController',
      data: {
        requireLogin: true
      }
    })
    .state('createtable', {
      parent: 'db',
      url: '/:database/createtable',
      templateUrl: 'app/db/viewTables/createtable.html',
      controller: 'CreateTableViewController',
      data: {
        requireLogin: true
      }
    })
    .state('records', {
      parent: 'db',
      url: '/:database/:table/:page',
      templateUrl: 'app/db/records.html',
      controller: 'RecordsController',
      data: {
        requireLogin: false 
      }
    })
    .state('kwikwery', {
      parent: 'main',
      url:'kwikwery',
      templateUrl: 'app/db/query/query.html',
      controller: 'QueryController',
      data: {
        requireLogin: false
      }
    });
   
    $urlRouterProvider.otherwise('/login');
})
// Hidden for dev (requires login to access states)
.run(function ($window, $http, $rootScope, $location, $state, Auth) {

  // Check for token on each state change
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    // Add token to headers for every http request
    var jwt = $window.localStorage.getItem('nodeadmin');
    $http.defaults.headers.common['Authorization'] = jwt;

    // If state requires login and if user doesn't have token
    if (toState.data.requireLogin && !Auth.isAuth()) {
      // User isn't authenticated, so prevent state change
      event.preventDefault();
      $state.transitionTo('login');         
    }
  });
});

