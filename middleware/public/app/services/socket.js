
angular.module('nodeadmin.socket', [])

.factory('SocketFactory', ['$location', '$window', function ($location, $window) {
  // var socket = io.connect();
  // console.log(socket);
  // var on = function (eventName, callback) {
  //   socket.on(eventName, function () {
  //     var args = arguments;
  //     $rootScope.$apply(function() {
  //       callback.apply(socket, args);
  //     });
  //   });
  // };

  // var emit = function (eventName, data, callback) {
  //   socket.emit(eventName, data, function() {
  //     var args = arguments;
  //     $rootScope.$apply(function () {
  //       if (callback) {
  //         callback.apply(socket, args);
  //       }
  //     });
  //   });
  // }
  // return {
  //   on: on,
  //   emit: emit
  // };
  var socketFact = {};
  //hacky way to make this work in developer environments at specified port number
  socketFact.host = $location.host() !== "localhost" ? $location.host() + ':' + $location.$$port  : "localhost:" + $location.$$port;

  socketFact.connect = function (nameSpace) {
    if (!nameSpace) {
      return io.connect(this.host, { forceNew: true });
    } else {
      return io.connect(this.host + "/" + nameSpace);
    }
  };

  return socketFact;
}]);


