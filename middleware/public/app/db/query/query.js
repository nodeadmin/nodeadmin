angular.module('nodeadmin.db.query', ['ui.codemirror'])

.controller('QueryController', ['$scope', 'QueryFactory', function ($scope, QueryFactory) {

  $scope.alerts = {
    error:[],
    success:[],
    table: []
  };

  $scope.closeAlert = function(type, index) {
    $scope.alerts[type].splice(index, 1);
  };

  $scope.cmPrefs = {
    mode: 'text/x-mssql',
    lineWrapping: true,
    theme: "monokai",
    indentWithTabs: false,
    smartIndent: true,
    matchBrackets : true,
    autofocus: true,
    extraKeys: {"Ctrl-Space": "autocomplete"},
    hintOptions: {
      tables: {
        users: {name: null, score: null, birthDate: null},
        countries: {name: null, population: null, size: null}
      }
    }
  };

  $scope.submitQuery = function () {
    data = { query: $scope.query };
    QueryFactory.submit(data)
    .then(function (resp) {

      // console.log(resp);
      
      result = (resp.status === 200) ? 'success' : 'error';
      $scope.alerts[result].push(
        {
          msg:resp.statusText,
          status:resp.status,
          error: resp.data.code,
          query: JSON.parse(resp.config.data).data.query
        }
      );

      if (resp.status === 200) {
        $scope.alerts.table[0] = 1;
        delete resp.data[0]['INFO'];
        $scope.queryResponseHeaders = Object.keys(resp.data[0]);
        $scope.queryResponseData = resp.data;
      }
    });
  };

}]);