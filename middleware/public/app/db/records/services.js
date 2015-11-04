(function () {
  'use strict';
  angular
    .module('nodeadmin.records.services', [])
    .factory('RecordsFactory', RecordsFactory)
    .factory('PaginationFactory', PaginationFactory)
    .factory('SortingFactory', SortingFactory)
    .factory('TypeCheckFactory', TypeCheckFactory)
    .factory('ForeignFactory', ForeignFactory)
    .factory('PrimaryKeyFactory', PrimaryKeyFactory);

  function RecordsFactory($http) {
    var service = {
      getRecords: getRecords,
      editRecord: editRecord,
      addRecord: addRecord
    };

    return service;

    function getRecords(db, table, page, sortBy, sortDir) {
      return $http.get('/nodeadmin/api/db/' + db + '/' + table + '/' + page + '?sortBy=' + sortBy + '&sortDir=' + sortDir)
        .then(getRecordsComplete)
        .catch(getRecordsFailed);

      function getRecordsComplete(response) {
        return response.data;
      }

      function getRecordsFailed(err) {
        console.error(err);
      }

    }

    function editRecord(db, table, page, data) {
      console.log('edit record is getting called');
      return $http.put('/nodeadmin/api/db/' + db + '/' + table + '/' + page, data)
        .then(editRecordComplete)
        .catch(editRecordFailed);

      function editRecordComplete(response) {
        return response;
      }

      function editRecordFailed(err) {
        console.error(err);
      }
    }

    function addRecord(db, table, page, data) {
      return $http.post('/nodeadmin/api/db/' + db + '/' + table + '/' + page, data)
        .then(addRecordComplete)
        .catch(addRecordFailed);

      function addRecordComplete(response) {
        return response.date;
      }

      function addRecordFailed(err) {
        console.log(err);
      }
    }

  }

  function PaginationFactory() {
    var currentPage = 1;
    var records = 0;
    var maxSize = 10;

    var service = {
      currentPage: currentPage,
      records: records,
      maxSize: maxSize,
    };

    return service;

  }

  function SortingFactory() {
    var sortBy = '';
    var sortDir = '';
    var currentTable = '';

    var service = {
      sortBy: sortBy,
      sortDir: sortDir,
      currentTable: currentTable,
      currentTableReset: currentTableReset,
      toggleSort: toggleSort

    };

    return service;

    function currentTableReset(table) {
      if (currentTable !== table) {
        sortBy = '';
        sortDir = '';
        currentTable = $stateParams.table;
      }
    }

    function toggleSort(column) {
      if (sortBy !== column) {
        sortBy = column;
        sortDir = 'DESC';
      } else {
        if (sortDir === 'DESC') {
          sortDir = 'ASC';
        } else {
          sortDir = 'DESC';
        }
      }
    }
  }

  function TypeCheckFactory() {
    var numTypes = ['integer', 'int', 'smallint', 'tinyint', 'mediumint', 'bigint', 'decimal', 'numeric', 'float', 'double', 'bit'];
    var enums = [];
    var service = {
      numTypes: numTypes,
      enums: enums,
      isNum: isNum,
      isEnum: isEnum,
      isRef: isRef,
      isAuto: isAuto,
      notNull: notNull
    };

    return service;

    function isNum(input) {
      var type = input.split('(')[0];
      if (numTypes.indexOf(type) > -1) {
        return true;
      }
    }

    function isEnum(input) {
      var type = input.split('(');
      if (type[0] === 'enum') {
        var options = type[1].substr(0, type[1].length - 1).split(',');
        var noQuotes = [];
        for (var i = 0; i < options.length; i++) {
          var temp = options[i].replace(/\'/g, '');
          noQuotes.push(temp);
        }
        enums = noQuotes;
        return true;
      }
    }

    function isAuto(extra) {
      if (extra === 'auto_increment') {
        return true;
      }
      return false;
    }

    function notNull(input) {
      if (input === 'NO') {
        return true;
      }
      return false;
    }
  }

  function ForeignFactory($http) {
    var foreignValues = [];
    var tableMap = {};
    var service = {
      foreignValues: foreignValues,
      getForeignValues: getForeignValues,
      setupForeignValues: setupForeignValues
    };

    return service;

    function getForeignValues(db, refTable, refColumn) {
      return $http.get('/nodeadmin/api/db/' + db + '/fk/' + refTable + '/' + refColumn)
        .then(getForeignValuesComplete)
        .catch(getForeignValuesFailed);

      function getForeignValuesComplete(response) {
        return response.data;
      }

      function getForeignValuesFailed(err) {
        console.error(err);
      }
    }

    function setupForeignValues(constraints) {
      if (constraints.length > 0) {
        var refTable = constraints[0]['REFERENCED_TABLE_NAME'];
        var refColumn = constraints[0]['REFERENCED_COLUMN_NAME'];
        tableMap.refColumn = constraints[0]['COLUMN_NAME'];
        getForeignValues($stateParams.database, refTable, refColumn)
          .then(getForeignValuesComplete)
          .catch(getForeignValuesFailed);

        function getForeignValuesComplete(result) {
            result.forEach(function (item) {
              for (var key in item) {
                foreignValues.push(item[key]);
              }
            });
          }

        function getForeignValuesFailed(err) {
          console.error(err);
        }
      }
    }
    function isRef(column) {
      if (tableMap.refColumn === column) {
        return true;
      }
      return false;
    }
  }

  function PrimaryKeyFactory() {
    var primaryKey;

    var service = {
      primaryKey: primaryKey,
      getPrimaryKey: getPrimaryKey
    };

    return service;

    function getPrimaryKey(headers) {
      for (var i = 0; i < headers.length; i++) {
        if (headers[i].Key === 'PRI') {
          primaryKey = headers[i].Field;
          return;
        }
        console.log('No Primary key');
      }
    }
  }
})();