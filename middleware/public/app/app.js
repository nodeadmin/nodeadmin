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
  'ui.bootstrap'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('setup', {
      url: '/setup',
      views: {
        content: {
          templateUrl: 'app/auth/setup.html',
          controller: 'AuthController'        
        }
      },

      data: {
        requireLogin: false
      }
    })
    .state('login', {
      url: '/login',
      views: {
        content: {
          templateUrl: './app/auth/login.html',
          controller: 'AuthController'
        }
      },

      data: {
        requireLogin: false
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
      },

      data: {
        requireLogin: true
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
          templateUrl: 'app/settings/settings.html',
          controller: 'SettingsController'          
        }
      },

      data: {
        requireLogin: true
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
      },

      data: {
        requireLogin: true
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
      },

      data: {
        requireLogin: true
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
      },

      data: {
        requireLogin: true
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
          templateUrl: 'app/system/system.html',
          controller: 'SystemController'
        }
      },

      data: {
        requireLogin: true
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
      },

      data: {
        requireLogin: true
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
      },

      data: {
        requireLogin: true
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
          templateUrl: 'app/db/db.html',
          controller: 'DBController'
        },
        data: {
          requireLogin: true
        }
      },

      data: {
        requireLogin: true
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
      },

      data: {
        requireLogin: true
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
      },

      data: {
        requireLogin: true
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
      },

      data: {
        requireLogin: true
      }
    });
   
    $urlRouterProvider.otherwise('/setup');
    
    // Add httpRequestInterceptor factory to http interceptors
    // $httpProvider.interceptors.push('httpRequestInterceptor');
})
// .factory('httpRequestInterceptor', function($window) {
//   // Intercepts all http requests
//   return {
//     request: function(config) {
//       var jwt = $window.localStorage.getItem('nodeadmin');
//       if (jwt) {
//         // Attach JWT to request headers
//         config.headers['X-Access-Token'] = jwt;
//       }
//       return config;
//     }
//   };
// })
// Hidden for dev
.run(function ($rootScope, $location, $state, Auth) {
// Check for token on each state change
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    // If state requires login and if user doesn't have token
    if (toState.data.requireLogin && !Auth.isAuth()) {
      // User isn't authenticated, so prevent state change
      event.preventDefault();
      // Get request to check if nodeadmin database exists
      if (Auth.doesDBExist()) {
        $state.transitionTo('login');
      } else {
        $state.transitionTo('setup');
      }
    }
  });
});

