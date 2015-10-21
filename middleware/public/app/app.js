angular.module('nodeadmin', [
  // 'nodeadmin.home',
  // 'nodeadmin.system',
  // 'nodeadmin.settings',
  // 'nodeadmin.db',
  'nodeadmin.services',
  'nodeadmin.home',
  'nodeadmin.auth',
  'nodeadmin.main',
  'nodeadmin.navbar',
  'ui.router',
  'ui.bootstrap'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('setup', {
      url: '/setup',
      views: {
        content: {
          templateUrl: './app/auth/setup.html',
          controller: 'AuthController',          
        }
      },

      data: {
        doesNotRequireLogin: true
      }
    })
    .state('login', {
      url: '/login',
      views: {
        content: {
          templateUrl: '',
          controller: '',          
        }
      },

      data: {
        doesNotRequireLogin: true
      }
    })

    .state('home', {
      url: '/',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: 'app/home/home.html',
          controller: 'HomeController'          
        }
      }
    })

    .state('settings', {
      url: '/settings',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '',
          controller: ''          
        }
      }
    })
    .state('settings.users', {
      url: '/settings/users',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '',
          controller: ''          
        }
      }
    })
    .state('settings.notifications', {
      url: '/settings/notifications',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '',
          controller: ''
        }
      }
    })
    .state('settings.advanced', {
      url: '/settings/advanced',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '',
          controller: ''          
        }
      }
    })

    .state('system', {
      url: '/system',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '',
          controller: ''          
        }
      }
    })
    .state('system.logs', {
      url: '/system/logs',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '',
          controller: ''          
        }
      }
    })
    .state('system.fs', {
      url: '/system/fs',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '',
          controller: ' '          
        }
      }
    })

    .state('db', {
      url: '/db',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '',
          controller: ''
        }
      }
    })
    .state('db.tables', {
      url: '/db/tables',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '',
          controller: ''      
        }
      }
    })
    .state('db.createTable', {
      url: '/db/createTable',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '',
          controller: ''          
        }
      }
    })
    .state('db.records', {
      url: '/db/records',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '',
          controller: ''          
        }
      }
    });
   
   $urlRouterProvider.otherwise('/setup');
})
// Hidden for dev
// .run(function($rootScope, $state, Auth) {
// // Check for token on each state change
//   $rootScope.$on('stateChangeStart', function(event, toState) {
//     // Check if state requires login 
//     if (!toState.data.doesNotRequireLogin && !Auth.isAuth()) {
//       // User isn't authenticated so prevent state change
//       event.preventDefault();
//       $state.transitionTo('login');
//     }
//   });
// });

