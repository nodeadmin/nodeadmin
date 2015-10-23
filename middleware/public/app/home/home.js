
angular.module('nodeadmin.home', [])
.controller('HomeController', function ($scope, Stats, SocketFactory) {

  $scope.serverStats = {};


  var toFileSize = function(bytes) {
    var getUnit = function(place) {
      switch(place) {
        case 0:
          return ' Bytes';
        case 1:
          return ' Kb';
        case 2:
          return ' Mb';
        case 3:
          return ' Gb';
        case 4:
          return ' Tb';
        default:
          return "you've got too much memory";
      }
    }

    var toSize = function(bytes, ind) {
      ind = ind || 0;
      if(isNaN(bytes)) {
        return 'error reading system memory';
      }

      if(bytes < 1024) {
        return bytes + getUnit(ind);
      } else {
        return toSize(bytes /= 1024, ind + 1);
      }
    }
    return toSize(bytes);
  }


  $scope.getServerStats = function() {
    Stats.serverStats()
      .then(function (stats){
        stats.data.memory = toFileSize(stats.data.memory);
        var _load = stats.data.load.reduce(function (avg, sample) {
          return avg += sample;
        }) / 3;

        stats.data.load = _load.toFixed(2) + ' seconds';
        $scope.serverStats = stats.data;
      })

  };

  $scope.load = function() {
    $scope.getServerStats();
    var sock = SocketFactory.connect('home');
    console.log(sock);
    sock.emit('pressure');
    sock.on('memory', function(data){
      // to do D3
    });

  };

  $scope.load();

});


