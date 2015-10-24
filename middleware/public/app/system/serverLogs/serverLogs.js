angular.module('nodeadmin.system.logs', [])
.controller('LogsController', ['$scope', 'SocketFactory', '$state', function ($scope, SocketFactory, $state) {
  
  $scope.logfile = [];
  var socket = SocketFactory.connect('system');
  var checkConnection = function () {
    if(socket.connected === true) {
      console.log('Socket: ', socket);
    }  else {
      console.log('Connecting socket: ', socket);
      // setTimeout(checkConnection, 5000);
      
    }
  };
  setTimeout(checkConnection, 5000);

  socket.on('system', function (data) {
    console.log('received in system');
  });

  $scope.getLogs = function () {
    console.log('func has been called');
    socket.emit('getlogs');
    socket.on('logs', function (log) {
      $scope.$apply($scope.logfile.push(log.data));
    });
  }
  $scope.getLogs();


  // var sysLogsSock = SocketFactory.connect('system.logs');
  // console.log(sysLogsSock);

  $scope.$on("$destroy", function () {
    console.log('stop sending shit');
    socket.emit('stopLog');
  });

}]);
