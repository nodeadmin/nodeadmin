(function () {
  
  angular
    .module('nodeadmin.records.services', [])
    .factory('RecordsFactory', RecordsFactory)
    .factory('PaginationFactory', PaginationFactory)
    .factory('SortingFactory', SortingFactory)
    .factory('TypeCheckFactory', TypeCheckFactory)
    .factory('ForeignFactory', ForeignFactory)
    .factory('PrimaryKeyFactory', PrimaryKeyFactory);

  function RecordsFactory($http) {
    var result = {
      success: false,
      failure: false
    }
    var service = {
      getRecords: getRecords,
      editRecord: editRecord,
      addRecord: addRecord,
      getResult: getResult,
      setResult: setResult
    };

    return service;

    function setResult(condition) {
      if (result[condition]) {
        result[condition] = false;
      } else {
        result[condition] = true;
      }

    }

    function getResult(condition) {
      return result[condition];
    }

    function getRecords(db, table, page, sortBy, sortDir) {
      return $http.get('/nodeadmin/api/db/' + db + '/' + table + '/' + page + '?sortBy=' + sortBy + '&sortDir=' + sortDir)
        .then(getRecordsComplete)
      //   .catch(getRecordsFailed);

      function getRecordsComplete(response) {
        return response.data;
      }

      // function getRecordsFailed(err) {
      //   console.error(err);
      // }

    }

    function editRecord(db, table, page, data) {
      return $http.put('/nodeadmin/api/db/' + db + '/' + table + '/' + page, data)
    }

    function addRecord(db, table, page, data) {
      return $http.post('/nodeadmin/api/db/' + db + '/' + table + '/' + page, data)
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
      currentTableReset: currentTableReset,
      toggleSort: toggleSort,
      getSortBy: getSortBy,
      getSortDir: getSortDir,
      getCurrentTable: getCurrentTable
    };

    return service;

    function setSortBy(val) {
      sortBy = val;
    }

    function getSortBy(val) {
      return sortBy;
    }

    function setSortDir(val) {
      sortDir = val;
    }

    function getSortDir() {
      return sortDir;
    }

    function setCurrentTable(val) {
      currentTable = val;
    }

    function getCurrentTable() {
      return currentTable;
    }

    function currentTableReset(table) {
      if (getCurrentTable() !== table) {
        setSortBy('');
        setSortDir('');
        setCurrentTable(table);
      }
      return;
    }

    function toggleSort(column) {
      if (getSortBy() !== column) {
        setSortBy(column);
        setSortDir('DESC');
      } else {
        if (getSortDir() === 'DESC') {
          setSortDir('ASC');
        } else {
          setSortDir('DESC');
        }
      }
      return;
    }
  }

  function TypeCheckFactory() {
    var numTypes = ['integer', 'int', 'smallint', 'tinyint', 'mediumint', 'bigint', 'decimal', 'numeric', 'float', 'double', 'bit'];
    var enums = [];
    var service = {
      numTypes: numTypes,
      getEnums: getEnums,
      isNum: isNum,
      isEnum: isEnum,
      isAuto: isAuto,
      notNull: notNull,
      isDate: isDate,
      enums: enums
    };

    return service;

    function setEnums(array) {
      enums = array;
    }

    function getEnums() {
      return enums;
    }

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
        setEnums(noQuotes);
        return true;
      }
      return false;
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

    function isDate(input) {
      if (input === 'date') {
        return true;
      }

      return false;
    }
  }

  function ForeignFactory($http, $stateParams) {
    var foreignValues = [];
    var tableMap = {};
    var service = {
      getForeignValuesArray: getForeignValuesArray,
      getForeignValues: getForeignValues,
      setupForeignValues: setupForeignValues,
      isRef: isRef
    };

    return service;

    function setForeignValuesArray(array) {
      foreignValues = array;
    }

    function getForeignValuesArray() {
      return foreignValues;
    }

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
          var temp = [];
          result.forEach(function (item) {
            for (var key in item) {
              temp.push(item[key]);
            }
          });

          setForeignValuesArray(temp);

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
      retrievePrimaryKey: retrievePrimaryKey,
      getPrimaryKey: getPrimaryKey
    };

    return service;

    function retrievePrimaryKey() {
      return primaryKey;
    }

    function setPrimaryKey(val) {
      primaryKey = val;
    }

    function getPrimaryKey(headers) {
      for (var i = 0; i < headers.length; i++) {
        if (headers[i].Key === 'PRI') {
          setPrimaryKey(headers[i].Field);
          return;
        }
      }
    }
  }
})();
