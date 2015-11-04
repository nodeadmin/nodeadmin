/* jshint strict: false */
angular.module('nodeadmin.db', [])
.controller('RecordsController', ['$scope', 'RecordsFactory', 'PaganacionFactory', 'ForeignFactory', 'SortingFactory', '$state', '$stateParams',
  function ($scope, RecordsFactory, PaganacionFactory, ForeignFactory, SortingFactory, $state, $stateParams) {
    var numTypes=['integer', 'int', 'smallint', 'tinyint', 'mediumint', 'bigint', 'decimal', 'numeric', 'float', 'double', 'bit'];
    $scope.records = {};
    $scope.headers = []; 
    $scope.row = {};
    $scope.rowing = false;
    $scope.error = '';
    $scope.isEditing = ''; 
    $scope.primaryKey = '';
    $scope.maxSize = PaganacionFactory.maxSize;
    $scope.table = $stateParams.table;
    $scope.loading = true;
    $scope.currentPage = PaganacionFactory.currentPage;
    $scope.recordsCount = PaganacionFactory.records;
    $scope.foreignValues = [];
    $scope.tableMap = {};
    $scope.enums = [];
    $scope.success = false;
    $scope.foreignColumn = '';
    $scope.getRecords = function () {
      RecordsFactory.getRecords($stateParams.database, $stateParams.table, $stateParams.page, SortingFactory.sortBy, SortingFactory.sortDir)
      .then(function (result) {
        $scope.records = result[0];
        $scope.headers = result[1];
        $scope.getForeignValues(result[3]);
        PaganacionFactory.records = result[2][0]['count(*)'] - 100;
        PaganacionFactory.currentPage = $stateParams.page;
        $scope.recordsCount = PaganacionFactory.records;
        $scope.currentPage = PaganacionFactory.currentPage;
        $scope.getPrimaryKey($scope.headers);
      })
      .catch(function (err) {
        $scope.error = err;
      })
      .finally(function () {
        $scope.loading = false;
      });
    };

    $scope.getForeignValues = function (constraints) {
      if (constraints.length > 0) {
        var refTable = constraints[0]['REFERENCED_TABLE_NAME'];
        var refColumn = constraints[0]['REFERENCED_COLUMN_NAME'];
        $scope.foreignColumn = refColumn;
        $scope.tableMap.refColumn = constraints[0]['COLUMN_NAME'];
        ForeignFactory.getForeignValues($stateParams.database, refTable, refColumn)
        .then(function (result) {
          result.forEach(function(item) {
            for (var key in item) {
              $scope.foreignValues.push(item[key]);
            }
         });
        });
      }
    };

    $scope.paganacion = function () {
      PaganacionFactory.currentPage = $scope.currentPage;
      $state.go('records', {
        database:$stateParams.database,
        table: $scope.table,
        page: $scope.currentPage,
        sortBy: $stateParams.sortBy,
        sortDir: $stateParams.sortDir
      });
    };
    
    $scope.isRef = function (column) {
      if ($scope.tableMap.refColumn === column) {
        return true;
      }
      return false;
    };

    $scope.isNum = function (input) {
      var type = input.split('(')[0];
      if (numTypes.indexOf(type) > -1) {
        return true;
      }
    };
    
    $scope.notNull = function (input) {
      if (input === 'NO') {
        return true;
      }
      return false;
    };

    $scope.isEnum = function (input) {
      var type = input.split('(');
      if (type[0] === 'enum') {
         var options = type[1].substr(0, type[1].length - 1).split(',');
         var noQuotes = [];
        for (var i = 0; i < options.length; i++) {
          var temp = options[i].replace(/\'/g, '');
          noQuotes.push(temp);
        }
        $scope.enums = noQuotes;
        return true;
      }
    };

    $scope.isAuto = function (extra) {
      if (extra === 'auto_increment') {
        return true;
      }
      return false;
    };

    $scope.getPrimaryKey = function (headers) {
      for (var i = 0; i < headers.length; i++) {
        if (headers[i].Key === 'PRI') {
          $scope.primaryKey = headers[i].Field;
          return;
        }
        console.log('No Primary key');
      }
    };

    $scope.toggleForm = function () {
      $scope.rowing = $scope.rowing ? false : true;
    };

    $scope.toggleSort = function (column) {
      console.log('This is sortBy: ' + $stateParams.sortBy);
      if (SortingFactory.sortBy !== column) {
        SortingFactory.sortBy = column;
        SortingFactory.sortDir = 'DESC';
      } else {
        if (SortingFactory.sortDir === 'DESC') {
          SortingFactory.sortDir = 'ASC'
        } else {
          SortingFactory.sortDir = 'DESC'
        }
      } 
      $state.go('records', {
        database: $stateParams.database,
        table: $stateParams.table,
        sortBy: SortingFactory.sortBy,
        sortDir: SortingFactory.sortDir
      }, {location: true});
      console.log(SortingFactory.sortBy);
      $scope.getRecords();

    };
    $scope.addRow = function () {
      console.log($scope.row);
      $scope.records.push($scope.row);
      RecordsFactory.addRecord($stateParams.database, $stateParams.table, $stateParams.page, $scope.row);
    };

    $scope.editCell = function (id, data) {
      $scope.isEditing = id;
    };

    $scope.cancel = function() {
        $scope.isEditing = false;
    };

    $scope.updateRow = function (data, index) {
      var update = {
        table: $stateParams.table,
        cols: $scope.headers,
        val: data,
        pk: $scope.primaryKey
      };
      console.log(data);      
      RecordsFactory.editRecord($stateParams.database, $stateParams.table, $stateParams.page, update)
      .then(function (result) {
        $scope.success = true;
      })
      .catch(function (err) {
        console.log(err);
      });
      $scope.isEditing = false;
    };

    $scope.getRecords();
}])  
.factory('dbFactory', function ($http) {
  return {
    getDatabases:function() {
      return $http({
        method:'GET',
        url:'/nodeadmin/api/db/connect'
      });
    }
  };
})
.factory('PaganacionFactory', [function () {
  return {
    currentPage: 1,
    records: 0,
    maxSize: 10
  };
}])
.factory('SortingFactory', [function () {
  return {
    sortBy: '',
    sortDir: ''
  };
}])
.controller('DBController', ['$scope','dbFactory', function ($scope, dbFactory) {

  // console.log(dbFactory);
  $scope.databases = [];

  $scope.menu = false;

  $scope.toggleMenu = function () {
    $scope.menu = !$scope.menu;
  };

  $scope.loadDatabases = function() {
    dbFactory.getDatabases()
      .then(function (dbs) {
        $scope.databases = dbs.data;

        // $scope.$digest();

      });
  };

  $scope.loadDatabases();

}]);
