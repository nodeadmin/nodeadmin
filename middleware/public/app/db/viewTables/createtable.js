angular.module('nodeadmin.db.createtable', [])
.controller('CreateTableViewController', ['$scope', '$uibModal', '$stateParams', 'Tables',
  function ($scope, $uibModal, $stateParams, Tables) {

    $scope.dataTypes = {
      common:['INT', 'VARCHAR', 'TEXT', 'DATE'],
      numeric:['TINYINT','SMALLINT','MEDIUMINT','INT','INTEGER','BIGINT','REAL','DOUBLE','FLOAT','DECIMAL','NUMERIC'],
      dateTime:['DATE','TIME','TIMESTAMP','DATETIME','YEAR'],
      string:['CHAR','BINARY','VARBINARY','TINYBLOB','BLOB','MEDIUMBLOB','LONGBLOB','TINYTEXT','TEXT','MEDIUMTEXT','LONGTEXT','ENUM','SET']
    };

    $scope.qualities = ['PRIMARY', 'UNIQUE', 'INDEX'];

    

  }
]);
