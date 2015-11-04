angular.module('nodeadmin.alertcenterfactory', [])
.factory('AlertCenter', [
  function() {
    var addAll = function(scope) {
      scope.alerts = {
        success: [],
        error: []
      }
      scope.closeAlert = function(type, index) {
        scope.alerts[type].splice(index, 1);
      };
      return scope;
    };

    return {
      addAll: addAll
    };

  }
]);