angular.module('nodeadmin.system.logs', [])
.controller('LogsController', ['$scope', 'SocketFactory', '$state', '$sce', function ($scope, SocketFactory, $state, $sce) {

    var first = ''
    var spanify = function (string) {
      var httpRegex = /POST|GET|PUT|DELETE/g;
      var regex = /([\[][\d]+[m.?])([^\[]*)/g;
      var colorRegex = /(\[\d+[m])/g;
      return string.replace(regex, function (substr) {
        var color = substr.match(colorRegex)[0];
        if(color === '[32m') {
          color = 'green';
        }
        else if (color === '[36m') {
          color = '#0072C6';
        }
        else if (color === '[31m') {
          color = 'red';
        } else {
          color = 'wheat';
        }
        var str = substr.split(colorRegex)[2];
        var newLine = httpRegex.test(str) ? first + '<div style="position: relative; bottom: .5em;">' : '';
        first = '</div>';
        return newLine + '<span style="color: ' + color + '">' + str + '</span>';
      });
    };

  $scope.logfile = [];
  var socket = SocketFactory.connect('system');

  $scope.getLogs = function () {
    socket.emit('getlogs');
    socket.on('logs', function (log) {
      log = $sce.trustAsHtml(spanify(log));
      $scope.$apply($scope.logfile.unshift(log));
    });
  }
  $scope.getLogs();

  $scope.$on("$destroy", function () {
    socket.removeListener('logs');
    socket.emit('stoplogs');
  });

}]);
