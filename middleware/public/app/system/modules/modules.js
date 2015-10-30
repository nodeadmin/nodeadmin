angular.module('nodeadmin.system.modules', [])
.controller('ModulesController', ['$scope', 'System', '$sce', function ($scope, System, $sce) {

$scope.colorDependencies = function(string) {
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
      case null:
        return 'wheat';
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

      //want to split out the '|'s but wrap the rest of the string in spans
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

$scope.getModules = function() {
  System.getModules()
  .then(function(modules) {
    
    // $scope.modules = $scope.colorDependencies(modules.data);
    // $scope.modules = modules.data;
    $scope.colorDependencies(modules.data);
  })
  .catch(function(err) {
    // Allow for error displaying on modules page
    $scope.error = err.data.error;
  })
};

// Get modules on load
$scope.getModules();
}]);
