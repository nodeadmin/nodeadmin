angular.module('nodeadmin.settings.editprivileges', [])
  .controller('EditPrivilegesController', function($scope, $stateParams, Users, RecordsFactory, AlertCenter) {
    $scope.user = $stateParams.user;
    $scope.host = $stateParams.host || 'localhost';
    $scope.headers = [];

    AlertCenter.addAll($scope);

    // Convert headers into readable format & necessary for making queries
    $scope.headersDictionary = {
      'Select_priv': 'SELECT',
      'Insert_priv': 'INSERT',
      'Update_priv': 'UPDATE',
      'Delete_priv': 'DELETE',
      'Create_priv': 'CREATE',
      'Drop_priv': 'DROP',
      'Reload_priv': 'RELOAD',
      'Shutdown_priv': 'SHUTDOWN',
      'Process_priv': 'PROCESS',
      'File_priv': 'FILE',
      'Grant_priv': 'GRANT OPTION',
      'References_priv': 'REFERENCES',
      'Index_priv': 'INDEX',
      'Alter_priv': 'ALTER',
      'Show_db_priv': 'SHOW DATABASES',
      'Super_priv': 'SUPER',
      'Create_tmp_table_priv': 'CREATE TEMPORARY TABLES',
      'Lock_tables_priv': 'LOCK TABLES',
      'Execute_priv': 'EXECUTE',
      'Repl_slave_priv': 'REPLICATION SLAVE',
      'Repl_client_priv': 'REPLICATION CLIENT',
      'Create_view_priv': 'CREATE VIEW',
      'Show_view_priv': 'SHOW VIEW',
      'Create_routine_priv': 'CREATE ROUTINE',
      'Alter_routine_priv': 'ALTER ROUTINE',
      'Create_user_priv': 'CREATE USER',
      'Event_priv': 'EVENT',
      'Trigger_priv': 'TRIGGER',
      // TODO: handle these options
      // 'Create_tablespace_priv': 'Create_tablespace_priv',
      // 'ssl_type': 'ssl_type',
      // 'ssl_cipher': 'ssl_cipher',
      // 'x509_issuer': 'x509_issuer',
      // 'x509_subject': 'x509_subject',
      // 'max_questions': 'max_questions',
      // 'max_updates': 'max_updates',
      // 'max_connections': 'max_connections',
      // 'max_user_connections': 'max_user_connections',
      // 'plugin': 'plugin',
      // 'authentication_string': 'authentication_string' 
    };

    $scope.getGrantsRecord = function() {
      Users.getGrantsRecord($scope.user, $scope.host)
        .then(function(response) {
          $scope.record = {};
          var record = response[0];
          // Describe table
          var headers = response[1];
          // Turn headers into readable format
          for (var i = 0; i < headers.length; i++) {
            for (var field in $scope.headersDictionary) {
              if (headers[i].Field === field) {
                $scope.headers.push($scope.headersDictionary[field]);
              }
            }
          }

          // Remove data that doesn't match to available headersDictionary because it requires more formatting (TODO: format this data properly)
          for (var key in record[0]) {
            if (key in $scope.headersDictionary) {
              $scope.record[key] = record[0][key];
            }
          }
        })
        .catch(function(err) {
          $scope.alerts.error.push({
            status: '400',
            msg: err
          });
        });
    };

    $scope.getGrantsRecord();

    $scope.grantAll = function() {
      var update = {
        column: null,
        val: 'grant'
      };

      Users.editGrantsRecord($scope.user, $scope.host, update)
        .then(function(result) {
          $scope.getGrantsRecord();
          $scope.alerts.success.push({
            msg: 'Successfully edited privileges.',
            status: '400'
          });
        })
        .catch(function(err) {
          $scope.alerts.error.push({
            status: '400',
            msg: err.data
          });
        });
    };

    $scope.revokeAll = function() {
      var update = {
        column: null,
        val: 'revoke'
      };

      Users.editGrantsRecord($scope.user, $scope.host, update)
        .then(function(result) {
          $scope.getGrantsRecord();
          $scope.alerts.success.push({
            msg: 'Successfully revoked all privileges.',
            status: '400'
          });
        })
        .catch(function(err) {
          $scope.alerts.error.push({
            status: '400',
            msg: err
          });
        });
    };

    $scope.editCell = function(id, column) {
      $scope.isEditing = id;
      $scope.column = column;
      $scope.column = $scope.headersDictionary[column];
    };

    $scope.cancel = function() {
      $scope.isEditing = false;
    };

    $scope.saveCell = function(column, data) {
      $scope.column = $scope.headersDictionary[column];

      var update = {
        column: $scope.column,
        val: data.toUpperCase()
      };

      Users.editGrantsRecord($scope.user, $scope.host, update)
        .then(function(result) {
          $scope.getGrantsRecord();
          $scope.alerts.success.push({
            msg: 'Successfully updated user privileges.',
            status: '400'
          });
        })
        .catch(function(err) {
          console.log(err);
          $scope.alerts.error.push({
            status: '400',
            msg: err
          });
        });
      $scope.isEditing = false;
    };

    // Display description of grants options
    // * This is not a `real` SQL table, just formatted in HTML as one
    $scope.getGrantsDescription = function() {
      Users.getGrantsDescription()
        .then(function(result) {
          $scope.showPrivileges = result;
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.getGrantsDescription();
  });
