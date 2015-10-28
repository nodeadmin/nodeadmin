angular.module('nodeadmin.db.query', ['ui.codemirror'])

.controller('QueryController', ['$scope', 'QueryFactory', function ($scope, QueryFactory) {

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
      console.log(resp);
      if(resp.status !== 200) {
        $scope.error = '' + resp.status + ':' + ' ' + JSON.stringify(resp.data);
      } else {
        $scope.success = '' + resp.status + ': Success!!';
        delete resp.data[0]['INFO'];
        $scope.queryResponseHeaders = Object.keys(resp.data[0]);
        $scope.queryResponseData = resp.data;
      }
    });
  };

}]);