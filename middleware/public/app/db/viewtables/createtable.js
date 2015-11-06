angular.module('nodeadmin.db.createtable', [])
.controller('CreateTableViewController', ['$scope', '$uibModal', '$stateParams','$state','Tables', 'AlertCenter',
  function ($scope, $uibModal, $stateParams, $state, Tables, AlertCenter) {

    AlertCenter.addAll($scope);
    
    $scope.add = 1;
    $scope.fields = [{
      'null':false,
      'default':'',
      'customDefault':false
    }];
    $scope.tablename = '';
    $scope.database = $stateParams.database;

    // change state of default
    $scope.toggleDefault = function(value, index) {
      if($scope.fields[index].customDefault && value !== 'custom') {
        $scope.fields[index].customDefault = false;
      }
      if(!$scope.fields[index].customDefault && value === 'custom') {
        $scope.fields[index].customDefault = true;
      }

      if(value === 'NULL') {
        $scope.fields[index].null = true;
      }

    };

    // checks default is not set to not null if not nullable
    $scope.nullChange = function(index) {
      if($scope.fields[index].null === false && $scope.fields[index].default === 'NULL') {
        $scope.fields[index].default = '';
      }
    }

    // adds additional field rows to table create form
    $scope.addField = function(num) {

      do {
        $scope.fields.push({'null': false, 'default':'', 'customDefault': false});
        
      } while(--num);
      
    };

    $scope.remove = function(index) {
      $scope.fields.splice(index,1);
    };

    // create table submit handler
    $scope.processTable = function() {

      if(!$scope.tablename) {
        // todo: - throw error to notification center - must submit table name
        $scope.alerts['error'].push({
          status:'Error ',
          msg: 'You must specify a table name'
        });
        return;

      }

      if(!$scope.database) {
        // todo: throw error to notification center - error retrieving database name
      }

      Tables.createTable($scope.database, $scope.tablename, $scope.fields)
        .then(function (response) {
          $scope.alerts['success'].push({
            msg:response.statusText + ' successful ' + response.config.method,
            status:response.status
          });

          $state.transitionTo('tables', {'database': $scope.database});

        })
        .catch(function (error){
          $scope.alerts['error'].push({
            msg:error.statusText + " " + error.data.sqlState + " " + error.data.code,
            status: error.status
          });
        });
    };

  }
]);
