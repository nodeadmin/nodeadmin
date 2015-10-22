
angular.module('nodeadmin.home', [])
.controller('HomeController', function ($scope, Stats) {

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

  var bytesToSize = function(bytes) {
     var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
     if (bytes == 0) return '0 Byte';
     var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
     return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

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

  $scope.getServerStats();
});


