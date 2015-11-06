/* jshint strict: false */
(function() {
  'use strict';
  angular
    .module('nodeadmin.services', [])
    .factory('Auth', Auth)
    .factory('System', System)
    .factory('Stats', Stats)
    .factory('DBInfoFactory', DBInfoFactory)
    .factory('QueryFactory', QueryFactory)
    .factory('Tables', Tables)
    .factory('DatabaseFactory', DatabaseFactory)
    .factory('Users', Users);

  //AUTH FACTORY//

  function Auth($http, $window) {
    var service = {
      login: login,
      isAuth: isAuth,
      logout: logout
    };


    return service;

    function login(user) {
      return $http({
          method: 'POST',
          url: '/nodeadmin/api/auth/login',
          data: user
        })
        .then(loginComplete)

      function loginComplete(response) {
        return response.data.token;
      }
    }

    function isAuth() {
      return !!$window.localStorage.getItem('nodeadmin');
    }

    function logout() {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/auth/logout',
        })
        .then(logoutComplete)
        .catch(logoutFailed);

      function logoutComplete(response) {
        return response;
      }

      function logoutFailed(err) {
        console.error(err);
      }
    };
  }

  //SYSTEM FACTORY//

  function System($http) {
    var service = {
      getModules: getModules
    };
    return service;

    function getModules() {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/system/modules'
        })
        .then(getModulesComplete)
        .catch(getModulesFailed);

      function getModulesComplete(response) {
        return response;
      }

      function getModulesFailed(err) {
        console.error(err);
      }
    }
  }

  //STATS FACTORY

  function Stats($http) {
    var service = {
      serverStats: serverStats
    };

    return service;

    function serverStats() {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/home/os'
        })
        .then(serverStatsComplete)
        .catch(serverStatsFailed);

      function serverStatsComplete(response) {
        return response;
      }

      function serverStatsFailed(err) {
        console.error(err);
      }
    }
  }

  //DBINFO FACTORY//

  function DBInfoFactory($http) {
    var service = {
      getPerformanceTimers: getPerformanceTimers,
      getInfo: getInfo
    };

    return service;

    function getPerformanceTimers() {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/db/performance',
        })
        .then(getPerformanceTimersComplete)
        .catch(getPerformanceTimersFailed);

      function getPerformanceTimersComplete(response) {
        return response.data;
      }

      function getPerformanceTimersFailed(err) {
        console.error(err);
      }
    }

    function getInfo() {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/db/info',
        })
        .then(getInfoComplete)
        .catch(getInfoFailed);

      function getInfoComplete(response) {
        return response.data;
      }

      function getInfoFailed(err) {
        console.error(err);
      }
    }
  }

  //QUERY FACTORY

  function QueryFactory($http) {
    var service = {
      submit: submit
    };

    return service;

    function submit(query) {
      return $http.post('/nodeadmin/api/db/query', JSON.stringify({
          'data': query
        }))
        .then(submitComplete)
        .catch(submitFailed);

      function submitComplete(response) {
        return response;
      }

      function submitFailed(err) {
        console.error(err);
      }
    }
  }

  //TABLES FACTORY

  function Tables($http) {

    // Allow access to table name between DeleteTable & TableView controllers
    var dropTableName;

    var service = {
      getTables: getTables,
      saveTableName: saveTableName,
      returnDropTableName: returnDropTableName,
      dropTable: dropTable,
      createTable: createTable
    };

    return service;

    function getTables(databaseName) {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/db/' + databaseName + '/tables'
        })
        .then(getTablesComplete)
        .catch(getTablesFailed);

      function getTablesComplete(response) {
        return response.data;
      }

      function getTablesFailed(err) {
        console.error(err);
      }
    }

    function dropTable(databaseName, tableName) {
      return $http({
          method: 'DELETE',
          url: '/nodeadmin/api/db/' + databaseName + '/' + tableName + ''
        })
        .then(dropTableComplete)
        .catch(dropTableFailed);

      function dropTableComplete(response) {
        return response.data;
      }

      function dropTableFailed(err) {
        console.error(err);
      }
    }

    function createTable(database, table, schema) {
      return $http({
          method: 'POST',
          url: ['/nodeadmin/api/db', database, table].join('/'),
          data: schema
        })
    }

    function saveTableName(tableName) {
      dropTableName = tableName;
    }

    function returnDropTableName() {
      return dropTableName;
    }
  }

  //DATABASE FACTORY//

  function DatabaseFactory($http) {
    var service = {
      createDB: createDB,
      deleteDB: deleteDB
    };

    return service;

    function createDB(name) {
      return $http({
          method: 'POST',
          url: '/nodeadmin/api/db/create/',
          data: name
        })
        .then(createDBComplete)
        .catch(createDBFailed);

      function createDBComplete(response) {
        return response;
      }

      function createDBFailed(err) {
        console.error(err);
      }
    }

    function deleteDB(name) {
      return $http({
          method: 'POST',
          url: '/nodeadmin/api/db/delete/',
          data: name
        })
        .then(deleteDBComplete)
        .catch(deleteDBFailed);

      function deleteDBComplete(response) {
        return response;
      }

      function deleteDBFailed(err) {
        console.error(err);
      }
    }
  }

  //USERS FACTORY//

  function Users($http) {
    // Saves user for getting grants & for deleting
    var grantUser = {};
    var deletedUser = {};

    var service = {
      getAll: getAll,
      editUser: editUser,
      getGrants: getGrants,
      getGrantsRecord: getGrantsRecord,
      saveGrantInfo: saveGrantInfo,
      returnGrantUser: returnGrantUser,
      addUser: addUser,
      saveDeleteUser: saveDeleteUser,
      getDeleteUser: getDeleteUser,
      deleteUser: deleteUser,
      editGrantsRecord: editGrantsRecord,
      getGrantsDescription: getGrantsDescription,
    };

    return service;

    function getAll() {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/settings/users'
        })
        .then(getAllComplete)
        .catch(getAllFailed)

      function getAllComplete(response) {
        return response.data;
      }

      function getAllFailed(err) {
        console.error(err);
      }
    }

    function addUser(user) {
      return $http({
          method: 'POST',
          url: '/nodeadmin/api/settings/users',
          data: user
        })
        .then(addUserComplete)
        // .catch(addUserFailed);

      function addUserComplete(response) {
        return response.data;
      }

      function addUserFailed(err) {
        console.error(err);
      }
    }

    function editUser(data) {
      return $http({
          method: 'PUT',
          url: '/nodeadmin/api/settings/users/',
          data: data,
        })
        .then(editUserComplete)
        .catch(editUserFailed);

      function editUserComplete(response) {
        return response.data;
      }

      function editUserFailed(err) {
        console.error(err);
      }
    }

    function deleteUser(user, host) {
      return $http({
          method: 'DELETE',
          url: '/nodeadmin/api/settings/users/' + user + '/' + host + '/'
        })
        .then(deleteUserComplete)
        .catch(deleteUserFailed);

      function deleteUserComplete(response) {
        return response.data;
      }

      function deleteUserFailed(err) {
        console.error(err);
      }
    }

    // For sharing information between modal & main view
    function saveDeleteUser(user) {
      deletedUser = user;
    }

    function getDeleteUser() {
      return deletedUser;
    }

    // 'SHOW GRANTS' per user
    function getGrants(user, host) {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/settings/users/' + user + '/' + host + '/grants/'
        })
        .then(getGrantsComplete)
        .catch(getGrantsFailed);

      function getGrantsComplete(response) {
        return response.data;
      }

      function getGrantsFailed(err) {
        console.error(err);
      }
    }

    // Get grants record per user for editing
    function getGrantsRecord(user, host) {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/settings/users/' + user + '/' + host + '/grantsrecord/'
        })
        .then(getGrantsRecordComplete)
        .catch(getGrantsRecordFailed);

      function getGrantsRecordComplete(response) {
        return response.data;
      }

      function getGrantsRecordFailed(err) {
        console.error(err);
      }
    }

    function editGrantsRecord(user, host, data) {
      return $http({
          method: 'PUT',
          url: '/nodeadmin/api/settings/users/' + user + '/' + host + '/grantsrecord',
          data: data
        })
        .then(editGrantsRecordComplete)
        // .catch(editGrantsRecordFailed);

      function editGrantsRecordComplete(response) {
        return response.data;
      }

      function editGrantsRecordFailed(err) {
        console.error(err);
      }
    }

    // For sharing information between modal & main view
    function saveGrantInfo(userInfo) {
      var user = userInfo.user;
      var host = userInfo.host;

      grantUser.user = user;
      grantUser.host = host;
    }

    function returnGrantUser() {
      return grantUser;
    }

    // Get description of grants options
    function getGrantsDescription() {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/settings/users/grantsdescription'
        })
        .then(getGrantsDescriptionComplete)
        .catch(getGrantsDescriptionFailed);

      function getGrantsDescriptionComplete(response) {
        return response.data;
      }

      function getGrantsDescriptionFailed(err) {
        console.error(err);
      }
    }
  }
})();
