/* jshint strict: false */
(function () {
  'use strict';
  angular
    .module('nodeadmin.records', [])
    .controller('RecordsController', RecordsController);

  function RecordsController($scope, RecordsFactory, PaginationFactory, ForeignFactory, SortingFactory, TypeCheckFactory, PrimaryKeyFactory, $state, $stateParams, AlertCenter) {

    AlertCenter.addAll($scope);

    $scope.records = {};
    $scope.headers = [];
    $scope.row = {};
    $scope.foreignValues = [];
    $scope.enums = TypeCheckFactory.getEnums();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.rowing = false;
    $scope.loading = true;
    $scope.isEditing = false;

    $scope.table = $stateParams.table;
    $scope.maxSize = PaginationFactory.maxSize;
    $scope.currentPage = PaginationFactory.currentPage;
    $scope.recordsCount = PaginationFactory.records;

    $scope.init = function () {
      SortingFactory.currentTableReset($stateParams.table);
      RecordsFactory.getRecords($stateParams.database, $stateParams.table, $stateParams.page, SortingFactory.getSortBy(), SortingFactory.getSortDir())
        .then(getRecordsComplete)
        .then(getForeignValues)
        .catch(getRecordsFailed)
        .finally(loadingComplete);

      function getRecordsComplete(result) {
        $scope.records = result[0].length ? result[0] : '';
        $scope.headers =result[1].length ? result[1] : '';
        PaginationFactory.records = result[2][0] > 0 ? result[2][0]['count(*)'] - 100 : 0;
        PaginationFactory.currentPage = $stateParams.page;
        PrimaryKeyFactory.getPrimaryKey($scope.headers);
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

    $scope.addRow = function () {
      RecordsFactory.addRecord($stateParams.database, $stateParams.table, $stateParams.page, $scope.row)
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
        console.error(err);
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
        cols: $scope.headers,
        val: data,
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
        console.error(err);
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

    $scope.isEnum = function (column) {
      var bool = TypeCheckFactory.isEnum(column);
      $scope.enums = TypeCheckFactory.getEnums();
      return bool;
    };


    $scope.isAuto = function (column, value) {
      return TypeCheckFactory.isAuto(column);
    };
    $scope.notNull = function (column) {
      return TypeCheckFactory.notNull(column);
    };

    $scope.isDate = function (column) {
      return TypeCheckFactory.isDate(column);
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