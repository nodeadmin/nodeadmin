angular.module('nodeadmin', [
  'nodeadmin.services',
  'nodeadmin.togglemenu',
  'nodeadmin.alertcenter',
  'nodeadmin.alertcenterfactory',
  'nodeadmin.socket',
  'nodeadmin.home',
  'nodeadmin.auth',
  'nodeadmin.main',
  'nodeadmin.settings',
  'nodeadmin.settings.users',
  'nodeadmin.settings.viewPrivileges',
  'nodeadmin.settings.editPrivileges',
  'nodeadmin.settings.addUser',
  'nodeadmin.settings.deleteUser',
  'nodeadmin.system',
  'nodeadmin.system.modules',
  'nodeadmin.system.logs',
  'nodeadmin.db',
  'nodeadmin.db.dbHome',
  'nodeadmin.db.createDb',
  'nodeadmin.db.deleteDb',
  'nodeadmin.db.viewTables',
  'nodeadmin.db.createTable',
  'nodeadmin.db.deleteTable',
  'nodeadmin.db.query',
  'nodeadmin.records',
  'nodeadmin.records.services',
  'ui.router',
  'ui.bootstrap',
  'chart.js',
  'angular-toArrayFilter',
  'pasvaz.bindonce',
  'angularSpinner'
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
      abstract: true,
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
      url: '',
      templateUrl: 'app/settings/users/users.html',
      controller: 'UsersController',
      data: {
        requireLogin: true
      }
    })
    .state('grants', {
      parent: 'settings',
      url: '/:user?host',
      templateUrl: 'app/settings/users/editPrivileges.html',
      controller: 'EditPrivilegesController',
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
    .state('dbHome', {
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
    .state('createTable', {
      parent: 'db',
      url: '/:database/createTable',
      templateUrl: 'app/db/viewTables/createTable.html',
      controller: 'CreateTableViewController',
      data: {
        requireLogin: true
      }
    })
    .state('records', {
      parent: 'db',
      url: '/:database/:table/:page?sortBy&sortDir',
      templateUrl: 'app/db/records/records.html',
      controller: 'RecordsController',
      data: {
        requireLogin: false
      }
    })
    .state('kwikwery', {
      parent: 'main',
      url:'query',
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

