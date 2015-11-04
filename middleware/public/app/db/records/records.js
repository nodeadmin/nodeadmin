/* jshint strict: false */
(function () {
  'use strict';
  angular
    .module('nodeadmin.records', [])
    .controller('RecordsController', RecordsController);

  function RecordsController($scope, RecordsFactory, PaginationFactory, ForeignFactory, SortingFactory, TypeCheckFactory, PrimaryKeyFactory, AlertCenter, $state, $stateParams) {

    $scope.records = {};
    $scope.headers = [];
    $scope.row = {};
    $scope.foreignValues = ForeignFactory.foreignValues;
    $scope.enums = TypeCheckFactory.enums;

    $scope.rowing = false;
    $scope.loading = true;
    $scope.success = false;
    $scope.isEditing = false;

    $scope.table = $stateParams.table;
    $scope.maxSize = PaginationFactory.maxSize;
    $scope.currentPage = PaginationFactory.currentPage;
    $scope.recordsCount = PaginationFactory.records;

    $scope.init = function () {
      SortingFactory.currentTableReset($stateParams.table);
      RecordsFactory.getRecords($stateParams.database, $stateParams.table, $stateParams.page, SortingFactory.sortBy, SortingFactory.sortDir)
        .then(getRecordsComplete)
        .catch(getRecordsFailed)
        .finally(loadingComplete);

        function getRecordsComplete(result) {
          $scope.records = result[0];
          $scope.headers = result[1];
          ForeignFactory.setupForeignValues(result[3]);
          PaginationFactory.records = result[2][0]['count(*)'] - 100;
          PaginationFactory.currentPage = $stateParams.page;
          PrimaryKeyFactory.getPrimaryKey($scope.headers);
        }

        function getRecordsFailed(err) {
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
        sortBy: SortingFactory.sortBy,
        sortDir: SortingFactory.sortDir
      }, {
        location: true
      });
      //$scope.getRecords();
    };

    $scope.toggleForm = function () {
      $scope.rowing = $scope.rowing ? false : true;
    };

    $scope.addRow = function () {
      $scope.records.push($scope.row);
      RecordsFactory.addRecord($stateParams.database, $stateParams.table, $stateParams.page, $scope.row)
        .then(addRecordComplete)
        .catch(addRecordFailed);

      function addRecordComplete(response) {
        //TODO: SEND REPONSE TO CLIENT
        console.log(response);
      }

      function addRecordFailed(err) {
        console.error(err);
      }
    };

    $scope.editRow = function (id) {
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
        pk: PrimaryKeyFactory.primaryKey
      };

      RecordsFactory.editRecord($stateParams.database, $stateParams.table, $stateParams.page, update)
        .then(editRecordComplete)
        .catch(editRecordFailed)
        .finally(setEditToFalse)
        function editRecordComplete(response) {
          //Display some success message to user
          $scope.success = true;
        }
        function editRecordFailed(err) {
          //display some failure message to user
          console.error(err);
        }
        function setEditToFalse() {
          $scope.isEditing = false;
        }
    };

    $scope.isRef = function(column) {
      return ForeignFactory.isRef(column);
    };

    $scope.isNum = function (column) {
      return TypeCheckFactory.isNum(column);
    };

    $scope.isEnum = function (column) {
      return TypeCheckFactory.isEnum(column);
    };

    $scope.isAuto = function (column) {
      return TypeCheckFactory.isAuto(column);
    };

    $scope.notNull = function (column) {
      return TypeCheckFactory.notNull(column);
    };


    $scope.init();
  }
})();


