
angular.module('nodeadmin.socket', [])

.factory('SocketFactory', ['$location', '$window', function ($location, $window) {
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


