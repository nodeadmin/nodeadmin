angular.module('nodeadmin.system.modules', ['ngSanitize'])
.controller('ModulesController', ['$scope', 'System', '$sce', 'AlertCenter', 
function ($scope, System, $sce, AlertCenter) {
  // $scope.alerts = {
  //   error:[],
  //   success:[]
  // };
  AlertCenter.addAll($scope);
  // $scope.closeAlert = function(type, index) {
  //   $scope.alerts[type].splice(index, 1);
  // };

  var colorDependencies = function(string) {
    var byLine = string.split('\n');
    var replacedString = [];


    var getColorForIndex = function(ind) {
      switch(ind) {
        case 0:
          return 'red';
        case 2:
          return 'yellow';
        case 4:
          return 'blue';
        case 6:
          return 'orange';
        case 8:
          return 'green';
      }
    }

    var wrapSpan = function(txt, ind) {
      var sp = document.createElement('span');
      sp.innerHTML = txt;
      sp.style.cssText = "color:" + getColorForIndex(ind);
      return sp.outerHTML;
    }

    var recurseHeirarchy = function (ArrStr) {
      var links = /\s(http|https):\/\/*/;
      ArrStr.forEach(function(lineString, ln) {

        var lineString = lineString.split('').map(function (ch, ind) {
          if(ch.charCodeAt() === 9500 ) {
            return wrapSpan(ch, ind);
          }
          if(ind % 2 === 0 && ch.charCodeAt() === 9516) {
            return wrapSpan(ch, ind);
          }
          if( ch.charCodeAt() === 9472) {
            return wrapSpan(ch, ind-1);
          }
          if(ch.charCodeAt() === 9492) {
            return wrapSpan(ch, ind);
          }
          if(ind % 2 === 0 && ch.charCodeAt() === 9474) {
            return wrapSpan(ch, ind);
          } else {
            return ch;
          }
        });

        replacedString.push(lineString.join(''));
        
      });
    };
    recurseHeirarchy(byLine);
    $scope.modules = $sce.trustAsHtml('<div>' + replacedString.join('</div><div>') + '</div>');

  };

  getModules = function() {
    var nodeadminRGXP = /( ERR! extraneous: nodeadmin@\d+.\d+.\d+ [\w-\/]+)/;
    System.getModules()
    .then(function(resp) {
      var modules = resp.data.stdout;
      colorDependencies(modules);
      if (resp.data.stderr.length > 0) {
        var error = resp.data.stderr.toString().replace(nodeadminRGXP, '');
        if(error.length > 4) {
          $scope.alerts.error.push({
            status: 'Error',
            msg: error
          });
        }
      }
    })
    .catch(function(err) {
      // Allow for error displaying on modules page
      var error = err.data.error.toString().replace(nodeadminRGXP, '');
      if(error.length > 4) {
        $scope.alerts.error.push({
          status: 'Error',
          msg: error
        });
      }
    });
  };

  // Get modules on load
  getModules();
}]);
