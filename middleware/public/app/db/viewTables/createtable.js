angular.module('nodeadmin.db.createtable', [])
.controller('CreateTableViewController', ['$scope', '$uibModal', '$stateParams', 'Tables', function ($scope, $uibModal, $stateParams, Tables) {

    $scope.alerts = { success: [], error: [] };
    
    $scope.fields = [{
      'null':'NOT NULL'
    }];
    $scope.tablename = '';
    $scope.database = $stateParams.database;



    // closes alert notification & used on close-after-timeout
    $scope.closeAlert = function(type, index) {
      $scope.alerts[type].splice(index, 1);
    };

    // adds additional field rows to table create form
    $scope.addField = function(num) {

      do {
        $scope.fields.push({'null': 'NOT NULL'});
        
      } while(--num);
      
    };

    // create table submit handler
    $scope.processTable = function() {

      if(!$scope.tablename) {
        // todo: - throw error to notification center - must submit table name

      }

      if(!$scope.database) {
        // todo: throw error to notification center - error retrieving database name
      }

      Tables.createTable($scope.database, $scope.tablename, $scope.fields)
        .then(function (response) {
          console.log('\n response ', response);
          $scope.alerts['success'].push({
            msg:response.statusText,
            status:response.status,
            method:response.config.method,
          });

        })
        .catch(function (error){
          $scope.alerts['error'].push(error);
        });
    };

  }
]);
