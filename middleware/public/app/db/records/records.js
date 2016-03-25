/* jshint strict: false */
(function () {
  'use strict';
  angular
    .module('nodeadmin.records', [])
    .controller('RecordsController', RecordsController);

  function RecordsController($scope, RecordsFactory, PaginationFactory, ForeignFactory, SortingFactory, TypeCheckFactory, PrimaryKeyFactory, $state, $stateParams, AlertCenter) {

    AlertCenter.addAll($scope);


    $scope.records = {
      row: {},
      data: [],
      structure: [],
      enums: {},
      dateCols: {}
    };
    $scope.foreignValues = [];

    $scope.rowing = false;
    $scope.loading = true;
    $scope.isEditing = false;

    $scope.table = $stateParams.table;
    $scope.maxSize = PaginationFactory.maxSize;
    $scope.currentPage = PaginationFactory.currentPage;
    $scope.recordsCount = PaginationFactory.records;

    var prepareDateTypes = function(recordData) {
      var dates = $scope.records.dateCols;
      for(var col in recordData) {
        if(col in dates) {
          recordData[col] = moment(new Date(recordData[col])).format(dates[col]);
        }
      }
      return recordData;
    };

    var fillEnumTypes = function() {
      var structure = $scope.records.structure;
      for(var i=0; i < structure.length; i++) {
        if(structure[i].Type.slice(0,4) === 'enum') {
          $scope.records.enums[structure[i].Field] = structure[i].Type.replace(/'|\(|enum|\)/g, '').split(',');
        }
      }

    };


    $scope.init = function () {
      SortingFactory.currentTableReset($stateParams.table);
      RecordsFactory.getRecords($stateParams.database, $stateParams.table, $stateParams.page, SortingFactory.getSortBy(), SortingFactory.getSortDir())
        .then(getRecordsComplete)
        .then(getForeignValues)
        .then(fillDateTypes)
        .then(fillEnumTypes)
        .catch(getRecordsFailed)
        .finally(loadingComplete);

      function getRecordsComplete(result) {
        $scope.records.data = result[0];
        $scope.records.structure = result[1];

        PaginationFactory.records = result[2][0] > 0 ? result[2][0]['count(*)'] - 100 : 0;
        PaginationFactory.currentPage = $stateParams.page;
        PrimaryKeyFactory.getPrimaryKey($scope.records.structure);
        $scope.recordsCount = PaginationFactory.records;
        $scope.currentPage = PaginationFactory.currentPage;
        if (result[3]) {
          ForeignFactory.setupForeignValues(result[3]);
        }
        return result;
      }

      function getForeignValues(result) {
        $scope.foreignValues = ForeignFactory.getForeignValuesArray();
      }

      function fillDateTypes() {
        var structure = $scope.records.structure;
        for(var i=0; i < structure.length; i++) {
          if(structure[i].Type === 'date') {
            $scope.records.dateCols[structure[i].Field] = 'YYYY-MM-DD';
          }
        }
      }

      function getRecordsFailed(err) {
        $scope.alerts.error.push({
          status: 'Error',
          mgs: 'Failed to fetch records for this table.'
        })
        console.error(err);
      }

      function loadingComplete() {
        $scope.loading = false;
      }
    };

    $scope.pagination = function () {
      $state.go('records', {
        database: $stateParams.database,
        table: $stateParams.table,
        page: $scope.currentPage,
        sortBy: $stateParams.sortBy,
        sortDir: $stateParams.sortDir
      });
    };

    $scope.toggleSort = function (column) {
      SortingFactory.toggleSort(column);
      $state.go('records', {
        database: $stateParams.database,
        table: $stateParams.table,
        sortBy: SortingFactory.getSortBy(),
        sortDir: SortingFactory.getSortDir()
      }, {
        location: true
      });
      $scope.init();
    };

    $scope.toggleForm = function () {
      $scope.foreignValues = ForeignFactory.getForeignValuesArray();
      $scope.rowing = $scope.rowing ? false : true;
    };

    $scope.addRow = function (data) {

      RecordsFactory.addRecord($stateParams.database, $stateParams.table, $stateParams.page, prepareDateTypes(data))
        .then(addRecordComplete)
        .catch(addRecordFailed)
        .finally(addRecordReset);

      function addRecordComplete(response) {
        $scope.alerts.success.push({
          status: 'Success',
          msg: 'Record created.'
        });
      }

      function addRecordFailed(err) {
        $scope.alerts.error.push({
          status: 'Error',
          msg: 'Unable to add record to the database'
        });
      }

      function addRecordReset() {
        RecordsFactory.setResult('success');
        RecordsFactory.setResult('failure');
        $scope.rowing = false;
        $scope.init();
      }
    };

    $scope.editRow = function (id) {
      $scope.foreignValues = ForeignFactory.getForeignValuesArray();
      $scope.isEditing = id;
    };

    $scope.cancel = function () {
      $scope.isEditing = false;
    };


    $scope.updateRow = function (data) {

      var update = {
        table: $stateParams.table,
        cols: $scope.records.structure,
        val: prepareDateTypes(data),
        pk: PrimaryKeyFactory.retrievePrimaryKey()
      };

      RecordsFactory.editRecord($stateParams.database, $stateParams.table, $stateParams.page, update)
        .then(editRecordComplete)
        .catch(editRecordFailed)
        .finally(setEditToFalse);

      function editRecordComplete(response) {
        $scope.alerts.success.push({
          status: 'Success',
          msg: 'Record updated.'
        });
      }

      function editRecordFailed(err) {
        $scope.alerts.error.push({
          status: 'Error',
          msg: 'Unable to add record to the database'
        });
      }

      function setEditToFalse() {
        $scope.isEditing = false;
      }
    };

    $scope.isRef = function (column) {
      return ForeignFactory.isRef(column);
    };

    $scope.isNum = function (column) {
      return TypeCheckFactory.isNum(column);
    };

    $scope.isEnum = function (column, ind) {
      return column in $scope.records.enums;
    };


    $scope.isAuto = function (column, value) {
      return TypeCheckFactory.isAuto(column);
    };
    $scope.notNull = function (column) {
      return TypeCheckFactory.notNull(column);
    };

    $scope.isDate = function (column) {
      return column in $scope.records.dateCols;
    };

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.status = {
      opened: false
    };

    $scope.init();
  }
})();
