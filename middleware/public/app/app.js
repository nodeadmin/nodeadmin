angular.module('nodeadmin', [
  'nodeadmin.services',
  'nodeadmin.socket',
  'nodeadmin.home',
  'nodeadmin.auth',
  'nodeadmin.main',
  'nodeadmin.navbar',
  'nodeadmin.settings',
  'nodeadmin.system',
  'nodeadmin.db',
  'ui.router',
  'ui.bootstrap',
  'chart.js'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('setup', {
      url: '/setup',
      templateUrl: 'app/auth/setup.html',
      controller: 'AuthController',
      data: {
        requireLogin: false
      }
    })
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
      controller: 'MainController',
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
      templateUrl: 'app/navbar/navbar.html',
      controller: 'NavController',
      data: {
        requireLogin: true
      }
    })
    .state('notifications', {
      parent: 'settings',
      url: 'settings/notifications',
      templateUrl: 'app/navbar/navbar.html',
      controller: 'NavController',
      data: {
        requireLogin: true
      }
    })
    .state('advanced', {
      parent: 'settings',
      url: 'settings/advanced',
      templateUrl: 'app/navbar/navbar.html',
      controller: 'NavController',
      data: {
        requireLogin: true
      }
    })

    .state('system', {
      parent: 'main',
      url: 'system',
      templateUrl: 'app/system/system.html',
      controller: 'SystemController',
      data: {
        requireLogin: true
      }
    })
    .state('logs', {
      parent: 'system',
      url: 'system/logs',
      templateUrl: 'app/navbar/navbar.html',
      controller: 'NavController',
      data: {
        requireLogin: true
      }
    })
    .state('fs', {
      parent: 'system',
      url: 'system/fs',
      templateUrl: 'app/navbar/navbar.html',
      controller: 'NavController',
      data: {
        requireLogin: true
      }
    })

    .state('db', {
      parent: 'main',
      url: 'db',
      templateUrl: 'app/db/db.html',
      controller: 'DBController',
      data: {
        requireLogin: true
      }
    })
    .state('tables', {
      parent: 'db',
      url: 'db/tables',
      templateUrl: 'app/navbar/navbar.html',
      controller: 'NavController',
      data: {
        requireLogin: true
      }
    })
    .state('createTable', {
      parent: 'db',
      url: 'db/createTable',
      templateUrl: 'app/navbar/navbar.html',
      controller: 'NavController',
      data: {
        requireLogin: true
      }
    })
    .state('records', {
      parent: 'db',
      url: 'db/records',
      templateUrl: 'app/navbar/navbar.html',
      controller: 'NavController',
      data: {
        requireLogin: true
      }
    });
   
    $urlRouterProvider.otherwise('/setup');
})
// Hidden for dev (requires login to access states)
// .run(function ($window, $http, $rootScope, $location, $state, Auth) {

//   // Check for token on each state change
//   $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

//     // Add token to headers for every http request
//     var jwt = $window.localStorage.getItem('nodeadmin');
//     $http.defaults.headers.common['Authorization'] = jwt;

//     // If state requires login and if user doesn't have token
//     if (toState.data.requireLogin && !Auth.isAuth()) {
//       // User isn't authenticated, so prevent state change
//       event.preventDefault();
//       // Get request to check if nodeadmin database exists
//       if (Auth.doesDBExist()) {
//         $state.transitionTo('login');
//       } else {
//         $state.transitionTo('setup');
//       }
//     }
//   });
// });

