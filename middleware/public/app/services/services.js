angular.module('nodeadmin.services', [])

.factory('Auth', ['$http', '$window',
  function($http, $window) {
    var login = function(user) {
      return $http({
        method: 'POST',
        url: '/nodeadmin/api/auth/login',
        data: user
      }).then(function(resp) {
        return resp.data.token;
      });
    };

    var isAuth = function() {
      return !!$window.localStorage.getItem('nodeadmin');
    };

    return {
      login: login,
      isAuth: isAuth,
    };

  }
])

.factory('System', function($http) {
  var getModules = function() {
    return $http({
      method: 'GET',
      url: '/nodeadmin/api/system/modules'
    }).then(function(resp) {
      return resp;
    });
  };

  return {
    getModules: getModules
  };
})

.factory('Stats', function($http) {
  return {
    serverStats: function() {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/home/os'
        })
        .then(function(data) {
          return data;
        })
        .catch(function(err) {
          return err
        });
    }
  };

})

.factory('RecordsFactory', ['$http',
  function($http) {
    return {
      getRecords: function(db, table) {
        return $http.get('/nodeadmin/api/db/' + db + '/' + table + '/records')
          .then(function(response) {
            console.log(response.data);
            return response.data;
          })
          .catch(function(err) {
            return err;
          })
      }
    }
  }])

.factory('DBInfoFactory', ['$http', function($http) {
  var getPerformanceTimers = function() {
    return $http({
      method: 'GET',
      url: '/nodeadmin/api/db/performance',
    }).then(function (resp) {
      // console.log(resp);
      return resp.data;
    });
  };
  var getInfo = function () {
    return $http({
      method: 'GET',
      url: '/nodeadmin/api/db/info',
    }).then(function (resp) {
      console.log(resp);
      return resp.data;
    });
  };

  return {
    getPerformanceTimers: getPerformanceTimers,
    getInfo: getInfo
  };

}])
  
.factory('Tables', ['$http',
  function($http) {
    return {
      getTables: function(databaseName) {
        return $http.get('/nodeadmin/api/db/' + databaseName + '/tables')
          .then(function(response) {
            // console.log('tablesfactory response: ', response.data);
            return response.data;
          })
          .catch(function(err) {
            return err;
          })
      }
    };
  }
]);
